import { Check, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out",
    features: [
      "1 image per day",
      "Auto-blur detection",
      "Full resolution",
      "No watermarks",
      "Privacy guaranteed"
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false
  },
  {
    name: "Pro",
    price: "$5",
    period: "one-time",
    description: "Unlimited forever",
    features: [
      "Unlimited images",
      "Priority processing",
      "Advanced blur options",
      "Batch processing",
      "Premium support"
    ],
    cta: "Unlock Pro",
    variant: "circular" as const,
    popular: true
  },
  {
    name: "Seller Pro+",
    price: "$9",
    period: "per month",
    description: "For power sellers",
    features: [
      "Everything in Pro",
      "API access",
      "Custom blur levels",
      "Priority support",
      "Early feature access"
    ],
    cta: "Go Pro+",
    variant: "default" as const,
    popular: false
  }
];

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PricingModal = ({ open, onOpenChange }: PricingModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center">
            Simple, Transparent Pricing
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Choose the plan that fits your selling needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`frosted-glass rounded-2xl p-6 shadow-soft relative transition-micro hover-lift ${
                plan.popular ? 'border-2 border-primary' : 'border border-border/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-primary px-4 py-1 rounded-full text-xs font-semibold shadow-glow-sm">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-4 font-light">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm text-muted-foreground font-light">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" strokeWidth={2} />
                    <span className="text-sm font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.variant} className="w-full" size="lg">
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 opacity-70">
          All plans include automatic blur detection • No hidden fees • Cancel anytime
        </p>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 rounded-full p-2 hover:bg-muted transition-micro"
        >
          <X className="w-4 h-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
};
