import { Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { getApiUrl, getUserId } from "@/lib/user";
import { toast } from "sonner";

const plans = [
  {
    name: "FREE",
    price: "$0",
    period: "per month",
    description: "Perfect for trying out",
    features: [
      "1 image per day",
      "Standard processing",
      "Basic detection",
      "Watermark applied",
      "Single-image upload"
    ],
    cta: "Start Free",
    variant: "outline" as const,
    popular: false,
    priceId: null
  },
  {
    name: "PRO",
    price: "$5",
    period: "per month",
    description: "For serious sellers",
    features: [
      "Unlimited images",
      "Fast processing",
      "No watermark",
      "Improved detection accuracy",
      "Priority over free users"
    ],
    cta: "Subscribe to Pro",
    variant: "circular" as const,
    popular: true,
    priceId: "PRICE_ID_PRO"
  },
  {
    name: "PRO+",
    price: "$9",
    period: "per month",
    description: "For teams and power users",
    features: [
      "Everything in Pro",
      "Ultra-fast processing",
      "Highest detection accuracy",
      "Priority queue",
      "Early access to new features",
      "Bulk upload (coming soon)"
    ],
    cta: "Subscribe to Pro+",
    variant: "default" as const,
    popular: false,
    priceId: "PRICE_ID_PRO_PLUS"
  }
];

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PricingModal = ({ open, onOpenChange }: PricingModalProps) => {
  const startCheckout = async (plan: typeof plans[0]) => {
    const userId = getUserId();
    if (!userId) {
      toast.error("User ID not found. Please refresh the page.");
      return;
    }

    // Free plan - just close modal
    if (plan.name === "FREE") {
      onOpenChange(false);
      return;
    }

    try {
      const apiUrl = getApiUrl();
      // Map plan names to backend format: PRO -> pro, PRO+ -> pro_plus
      const safePlanName = (plan.name || "").toLowerCase();
      const planName = plan.name === "PRO" ? "pro" : plan.name === "PRO+" ? "pro_plus" : safePlanName;
      
      const checkoutUrl = `${apiUrl}/create-checkout-session?plan=${planName}&user_id=${userId}`;
      console.log("Creating checkout session:", checkoutUrl);
      
      const response = await fetch(checkoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || "Failed to create checkout session");
      }

      const data = await response.json();
      console.log("Checkout session created:", data);
      
      if (data.url || data.session?.url) {
        // Redirect to Stripe checkout URL (test mode)
        window.location.href = data.url || data.session.url;
      } else {
        throw new Error("No checkout URL received from backend");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to start checkout. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-[hsl(var(--card))] border-border">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold text-center text-foreground dark:text-foreground">
            Simple, Transparent Pricing
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground dark:text-muted-foreground text-xs">
            Choose the plan that fits your selling needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`frosted-glass rounded-2xl p-5 shadow-soft relative transition-micro hover-lift ${
                plan.popular 
                  ? 'border-2 border-primary bg-gradient-to-b from-primary/5 to-transparent shadow-glow-sm scale-105' 
                  : 'border border-border/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-primary px-4 py-1 rounded-full text-xs font-bold shadow-glow-sm text-primary-foreground tracking-wide">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-1 text-foreground dark:text-foreground tracking-tight">{plan.name}</h3>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground mb-3 font-light">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground dark:text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground dark:text-muted-foreground font-light">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} strokeWidth={2.5} />
                    <span className={`text-xs font-light ${plan.popular ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.variant} 
                className={`w-full ${plan.popular ? 'shadow-glow-sm' : ''}`}
                size="default"
                onClick={() => startCheckout(plan)}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground dark:text-muted-foreground mt-4 opacity-70">
          All plans include automatic blur detection • No hidden fees • Cancel anytime
        </p>
      </DialogContent>
    </Dialog>
  );
};
