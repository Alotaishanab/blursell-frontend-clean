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
    <div className="w-full max-w-4xl mx-auto px-4 space-y-6">
      {/* Preview Card */}
      <div className="glass-card rounded-2xl p-6 shadow-medium">
        <div className="relative rounded-xl overflow-hidden bg-muted">
          <img
            src={showOriginal ? originalImage : blurredImage}
            alt={showOriginal ? "Original" : "Blurred"}
            className="w-full h-auto transition-opacity duration-300"
          />
          
          {/* Toggle overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <Button
              variant="glass"
              size="sm"
              onClick={() => setShowOriginal(!showOriginal)}
              className="backdrop-blur-xl"
            >
              {showOriginal ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Show Blurred
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Show Original
                </>
              )}
            </Button>
            
            <div className="glass-card px-3 py-1.5 text-sm font-medium backdrop-blur-xl">
              {showOriginal ? "Original" : "✨ Blurred"}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="hero" size="lg" onClick={handleDownload} className="sm:w-auto w-full">
          <Download className="w-5 h-5" />
          Download Blurred Image
        </Button>
        
        <Button variant="glass" size="lg" onClick={onReset} className="sm:w-auto w-full">
          <RotateCcw className="w-5 h-5" />
          Process Another
        </Button>
      </div>

      {/* Info */}
      <p className="text-center text-sm text-muted-foreground">
        No watermarks • Full resolution • Ready to upload
      </p>
    </div>
  );
};
