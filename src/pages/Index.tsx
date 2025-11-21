import { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { UploadZone } from "@/components/UploadZone";
import { ImagePreview } from "@/components/ImagePreview";
import { PricingModal } from "@/components/PricingModal";
import { toast } from "sonner";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [blurredImage, setBlurredImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const uploadRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    
    // Create preview of original image
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Create FormData for API
      const formData = new FormData();
      formData.append('image', file);

      // Call your FastAPI backend
      const response = await fetch('/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Processing failed');
      }

      // Get blurred image blob
      const blob = await response.blob();
      const blurredUrl = URL.createObjectURL(blob);
      setBlurredImage(blurredUrl);
      
      toast.success("Image processed successfully!");
    } catch (error) {
      console.error('Processing error:', error);
      toast.error("Failed to process image. Please try again.");
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
          {!uploadedImage && !blurredImage ? (
            <UploadZone onImageUploaded={handleImageUpload} isProcessing={isProcessing} />
          ) : (
            <ImagePreview
              originalImage={uploadedImage!}
              blurredImage={blurredImage!}
              onReset={handleReset}
            />
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-border/30 py-12 px-4 mt-20">
          <div className="container mx-auto text-center">
            <p className="text-sm text-muted-foreground opacity-70 font-light">
              © 2024 BlurSell. Built with privacy in mind.
            </p>
          </div>
        </footer>
      </main>

      <PricingModal open={isPricingOpen} onOpenChange={setIsPricingOpen} />
    </div>
  );
};

export default Index;
