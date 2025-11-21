import { Upload } from "lucide-react";
import { Button } from "./ui/button";

interface HeroProps {
  onUploadClick: () => void;
}

export const Hero = ({ onUploadClick }: HeroProps) => {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] gradient-glow blur-3xl animate-pulse-glow pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          Auto-Blur Seller Photos
          <br />
          <span className="text-muted-foreground font-light">
            in Seconds.
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light">
          Blur license plates, house numbers, serial numbers — instantly.
        </p>
        
        {/* Circular floating upload button */}
        <div className="relative inline-block">
          {/* Pulsating halo */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-ripple" />
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ripple" style={{ animationDelay: '1s' }} />
          
          <Button 
            variant="circular" 
            size="icon-xl"
            onClick={onUploadClick}
            className="relative z-10"
          >
            <Upload className="w-8 h-8" />
          </Button>
        </div>
        
        <p className="mt-6 text-sm text-muted-foreground font-light">
          Click to upload your first image
        </p>
      </div>
    </section>
  );
};
