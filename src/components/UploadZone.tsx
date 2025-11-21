import { useCallback, useState, useEffect } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface UploadZoneProps {
  onImageUploaded: (file: File) => void;
  isProcessing: boolean;
  isUnlocked?: boolean;
  dailyUsage?: number;
}

export const UploadZone = ({ onImageUploaded, isProcessing, isUnlocked = false, dailyUsage = 0 }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    // Safe file type and name extraction
    const safeType = (file.type || "").toLowerCase();
    const safeName = (file.name || "").toLowerCase();

    // Validate image file
    const isImage =
      safeType.startsWith("image/") ||
      /\.(png|jpg|jpeg|webp|gif)$/i.test(safeName);

    if (!isImage) {
      console.error("Unsupported file type", { safeType, safeName });
      toast.error("Unsupported file type. Please upload a valid image.");
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be under 10MB");
      return;
    }
    
    onImageUploaded(file);
  }, [onImageUploaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemType = (item.type || "").toLowerCase();
      
      if (itemType.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          handleFile(file);
          toast.success("Image pasted successfully!");
        }
      }
    }
  }, [handleFile]);

  // Add paste listener
  useEffect(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative frosted-glass rounded-2xl p-16 border-2 border-dashed transition-micro ${
          isDragging 
            ? 'border-primary bg-primary/5 shadow-glow-sm scale-[1.02]' 
            : 'border-border hover:border-primary/30 hover:shadow-soft'
        } ${isProcessing ? 'pointer-events-none opacity-60' : ''}`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
            <p className="text-base font-medium">Processing your image...</p>
            <p className="text-sm text-muted-foreground opacity-70">This usually takes 3-5 seconds</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full frosted-glass flex items-center justify-center shadow-soft border border-border/50">
              <Upload className="w-7 h-7 text-primary" strokeWidth={1.5} />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">Upload Your Image</h3>
              <p className="text-sm text-muted-foreground font-light">
                Drag and drop, click to browse, or press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl+V</kbd> to paste
              </p>
            </div>
            
            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <Button variant="circular" size="lg" className="cursor-pointer px-8" asChild>
                <span>
                  Choose Image
                </span>
              </Button>
            </label>
            
            <p className="text-xs text-muted-foreground opacity-70">
              Supports JPG, PNG, WebP • Max 10MB
            </p>
            {!isUnlocked ? (
              <p className="text-xs text-muted-foreground opacity-70 mt-2">
                Free: {dailyUsage}/1 image today
              </p>
            ) : (
              <p className="text-xs text-primary opacity-80 mt-2 font-medium">
                ✓ Unlimited processing
              </p>
            )}
          </div>
        )}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4 opacity-70">
        Your images are processed securely and never stored
      </p>
    </div>
  );
};
