import { Shield, Zap, Lock } from "lucide-react";

export const Hero = () => {
  return (
    <section className="pt-32 pb-16 px-4">
      <div className="container mx-auto max-w-5xl text-center">
        {/* Floating decoration */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card shadow-soft mb-6 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Privacy-First Image Protection</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Auto-Blur Your Selling
            <br />
            <span className="bg-clip-text text-transparent gradient-primary">
              Photos in Seconds
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Blur license plates, house numbers, serial numbers — instantly and automatically. 
            Sell safely on Facebook Marketplace, eBay, Depop, and more.
          </p>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">Instant processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">100% private</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="text-sm text-muted-foreground">No signup required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
