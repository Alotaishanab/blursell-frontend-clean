import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { UploadZone } from "@/components/UploadZone";
import { ImagePreview } from "@/components/ImagePreview";
import { PricingModal } from "@/components/PricingModal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { initializeUserId, getUserId, isUnlocked as checkUnlocked, getApiUrl } from "@/lib/user";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [blurredImage, setBlurredImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isUnlocked, setIsUnlockedState] = useState(false);
  const [dailyUsage, setDailyUsage] = useState(0);
  const uploadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize user_id on mount
    initializeUserId();
    // Check unlock state
    setIsUnlockedState(checkUnlocked());
    
    // Check daily usage from localStorage
    const today = new Date().toDateString();
    const lastUsageDate = localStorage.getItem("last_usage_date");
    const usageCount = localStorage.getItem("daily_usage_count");
    
    if (lastUsageDate === today) {
      setDailyUsage(parseInt(usageCount || "0", 10));
    } else {
      setDailyUsage(0);
      localStorage.setItem("last_usage_date", today);
      localStorage.setItem("daily_usage_count", "0");
    }
  }, []);

  const handleImageUpload = async (file: File) => {
    // Check if user is unlocked or has free usage left
    if (!isUnlocked) {
      const today = new Date().toDateString();
      const lastUsageDate = localStorage.getItem("last_usage_date");
      const usageCount = parseInt(localStorage.getItem("daily_usage_count") || "0", 10);
      
      // Reset daily count if it's a new day
      if (lastUsageDate !== today) {
        localStorage.setItem("last_usage_date", today);
        localStorage.setItem("daily_usage_count", "0");
        setDailyUsage(0);
      } else if (usageCount >= 1) {
        toast.error("You've reached your daily limit (1 image). Upgrade to Pro for unlimited processing!");
        setIsPricingOpen(true);
        return;
      }
    }

    setIsProcessing(true);
    
    // Create preview of original image
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error("User ID not found");
      }

      // Create FormData for API
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", userId);

      const apiUrl = getApiUrl();
      const response = await fetch(`${apiUrl}/process`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Handle 402 Payment Required or upgrade required
        if (response.status === 402) {
          toast.error("Upgrade required for unlimited processing!");
          setIsPricingOpen(true);
          setUploadedImage(null);
          setIsProcessing(false);
          return;
        }

        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.detail || errorData.message || 'Processing failed';
        
        // Check if error message indicates upgrade needed
        if (errorMessage.toLowerCase().includes('upgrade') || 
            errorMessage.toLowerCase().includes('subscription') ||
            errorMessage.toLowerCase().includes('limit')) {
          toast.error("Upgrade required!");
          setIsPricingOpen(true);
          setUploadedImage(null);
          setIsProcessing(false);
          return;
        }
        
        throw new Error(errorMessage);
      }

      // Get blurred image blob
      const blob = await response.blob();
      const blurredUrl = URL.createObjectURL(blob);
      setBlurredImage(blurredUrl);
      
      // Update daily usage if not unlocked
      if (!isUnlocked) {
        const newCount = dailyUsage + 1;
        setDailyUsage(newCount);
        localStorage.setItem("daily_usage_count", newCount.toString());
      }
      
      toast.success("Image processed successfully!");
    } catch (error) {
      console.error('Processing error:', error);
      toast.error(error instanceof Error ? error.message : "Failed to process image. Please try again.");
      setUploadedImage(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setUploadedImage(null);
    setBlurredImage(null);
    setIsProcessing(false);
  };

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-background dark overflow-hidden">
      <Header 
        onUploadClick={scrollToUpload}
        onPricingClick={() => setIsPricingOpen(true)}
      />
      
      <main>
        <Hero onUploadClick={scrollToUpload} />
        
        <section ref={uploadRef} className="py-12 px-4">
          {!isUnlocked && dailyUsage >= 1 && (
            <div className="max-w-3xl mx-auto mb-6 frosted-glass rounded-2xl p-6 border border-primary/30 shadow-soft">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  You've used your free image for today. Upgrade to Pro for unlimited processing!
                </p>
                <Button variant="circular" onClick={() => setIsPricingOpen(true)}>
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          )}
          {!uploadedImage && !blurredImage ? (
            <UploadZone 
              onImageUploaded={handleImageUpload} 
              isProcessing={isProcessing}
              isUnlocked={isUnlocked}
              dailyUsage={dailyUsage}
            />
          ) : (
            <ImagePreview
              originalImage={uploadedImage!}
              blurredImage={blurredImage!}
              onReset={handleReset}
            />
          )}
        </section>

        {/* Footer */}
        <footer className="relative border-t border-border/40 py-20 px-4 mt-24 bg-gradient-to-b from-transparent to-background/50">
          <div className="container mx-auto max-w-6xl">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Brand Section */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold tracking-tight text-foreground">
                    BlurSell
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  Automatically blur sensitive information from your selling photos. Privacy-first, secure, and instant.
                </p>
              </div>

              {/* Contact Section */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">
                  Support
                </h3>
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2 font-medium">
                      Need assistance?
                    </p>
                    <a 
                      href="mailto:mattwhittck@gmail.com" 
                      className="inline-flex items-center gap-2.5 text-sm text-foreground hover:text-primary transition-micro font-medium group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-micro">
                        <svg 
                          className="w-4 h-4 text-primary transition-transform group-hover:scale-110" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                          />
                        </svg>
                      </div>
                      <span className="group-hover:underline">mattwhittck@gmail.com</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">
                  Trust & Security
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-xs text-muted-foreground font-medium">Privacy First</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-xs text-muted-foreground font-medium">Secure Processing</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-xs text-muted-foreground font-medium">No Data Storage</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span className="text-xs text-muted-foreground font-medium">GDPR Compliant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-border/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground font-medium">
                  © 2025 BlurSell. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-xs text-muted-foreground">
                  <span className="hover:text-foreground transition-micro cursor-default">Terms</span>
                  <span className="text-border/50">•</span>
                  <span className="hover:text-foreground transition-micro cursor-default">Privacy</span>
                  <span className="text-border/50">•</span>
                  <span className="hover:text-foreground transition-micro cursor-default">Security</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <PricingModal 
        open={isPricingOpen} 
        onOpenChange={(open) => {
          setIsPricingOpen(open);
          // Refresh unlock state when modal closes (in case user unlocked)
          if (!open) {
            setIsUnlockedState(checkUnlocked());
          }
        }} 
      />
    </div>
  );
};

export default Index;
