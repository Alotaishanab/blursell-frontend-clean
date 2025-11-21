import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="w-6 h-6 text-primary animate-pulse-glow" />
            <div className="absolute inset-0 blur-xl bg-primary/30 animate-pulse-glow" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent gradient-primary">
            BlurSell
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            Features
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            Pricing
          </a>
          <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            FAQ
          </a>
        </nav>
      </div>
    </header>
  );
};
