import { Button } from "./ui/button";

interface HeaderProps {
  onUploadClick: () => void;
  onPricingClick: () => void;
}

export const Header = ({ onUploadClick, onPricingClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 frosted-glass border-b border-border/30">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-bold tracking-tight">
            BlurSell
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={onPricingClick}
            className="text-sm text-muted-foreground hover:text-foreground transition-micro font-medium"
          >
            Pricing
          </button>
          <a 
            href="#help" 
            className="text-sm text-muted-foreground hover:text-foreground transition-micro font-medium"
          >
            Help
          </a>
          <Button 
            variant="circular" 
            size="default"
            onClick={onUploadClick}
            className="px-6"
          >
            Upload
          </Button>
        </nav>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Button 
            variant="circular" 
            size="sm"
            onClick={onUploadClick}
            className="px-4"
          >
            Upload
          </Button>
        </div>
      </div>
    </header>
  );
};
