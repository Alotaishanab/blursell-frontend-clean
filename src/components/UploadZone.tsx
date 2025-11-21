import { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface UploadZoneProps {
  onImageUploaded: (file: File) => void;
  isProcessing: boolean;
}

export const UploadZone = ({ onImageUploaded, isProcessing }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
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
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleFile(file);
          toast.success("Image pasted successfully!");
        }
      }
    }
  }, [handleFile]);

  // Add paste listener
  useState(() => {
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  });

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative glass-card rounded-2xl p-12 border-2 border-dashed transition-all duration-300 ${
          isDragging 
            ? 'border-primary bg-primary/5 shadow-glow scale-105' 
            : 'border-border hover:border-primary/50 hover:shadow-medium'
        } ${isProcessing ? 'pointer-events-none opacity-60' : ''}`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-16 h-16 text-primary animate-spin" />
            <p className="text-lg font-medium">Processing your image...</p>
            <p className="text-sm text-muted-foreground">This usually takes 3-5 seconds</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center shadow-soft">
                <Upload className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute inset-0 blur-2xl bg-primary/20 animate-pulse-glow" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold">Upload Your Image</h3>
              <p className="text-muted-foreground">
                Drag and drop, click to browse, or press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl+V</kbd> to paste
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <Button variant="hero" size="lg" className="cursor-pointer" asChild>
                  <span>
                    <ImageIcon className="w-5 h-5" />
                    Choose Image
                  </span>
                </Button>
              </label>
            </div>
            
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, WebP • Max 10MB
            </p>
          </div>
        )}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        Your images are processed securely and never stored
      </p>
    </div>
  );
};
