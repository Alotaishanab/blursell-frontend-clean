import { useState } from "react";
import { Download, Eye, EyeOff, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface ImagePreviewProps {
  originalImage: string;
  blurredImage: string;
  onReset: () => void;
}

export const ImagePreview = ({ originalImage, blurredImage, onReset }: ImagePreviewProps) => {
  const [showOriginal, setShowOriginal] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = blurredImage;
    link.download = `blurred-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded successfully!");
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-8">
      {/* Side-by-side preview cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Original */}
        <div className="frosted-glass rounded-2xl p-4 shadow-soft border border-border/50">
          <div className="relative rounded-xl overflow-hidden bg-background/50 mb-3">
            <img
              src={originalImage}
              alt="Original"
              className="w-full h-auto"
            />
          </div>
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium text-muted-foreground">Original</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
              className="h-8"
            >
              {showOriginal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Blurred */}
        <div className="frosted-glass rounded-2xl p-4 shadow-soft border border-primary/20">
          <div className="relative rounded-xl overflow-hidden bg-background/50 mb-3">
            <img
              src={blurredImage}
              alt="Blurred"
              className="w-full h-auto"
            />
            <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
              Blurred
            </div>
          </div>
          <div className="flex items-center justify-between px-2">
            <span className="text-sm font-medium">Protected</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          variant="circular" 
          size="lg" 
          onClick={handleDownload} 
          className="sm:w-auto w-full px-8 hover-glow"
        >
          <Download className="w-5 h-5" />
          Download Blurred Image
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          onClick={onReset} 
          className="sm:w-auto w-full px-8"
        >
          <RotateCcw className="w-5 h-5" />
          Process Another
        </Button>
      </div>

      {/* Info */}
      <p className="text-center text-sm text-muted-foreground opacity-70">
        No watermarks • Full resolution • Ready to upload
      </p>
    </div>
  );
};
