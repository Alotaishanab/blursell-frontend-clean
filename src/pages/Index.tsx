import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { UploadZone } from "@/components/UploadZone";
import { ImagePreview } from "@/components/ImagePreview";
import { PricingCards } from "@/components/PricingCards";
import { toast } from "sonner";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [blurredImage, setBlurredImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      
      <main>
        <Hero />
        
        <section className="py-12 px-4">
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

        <PricingCards />

        {/* Footer */}
        <footer className="border-t border-border/50 py-8 px-4 mt-20">
          <div className="container mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 BlurSell. Built with privacy in mind. 🔒
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
