import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Free",
    icon: Zap,
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
    icon: Crown,
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
    variant: "hero" as const,
    popular: true
  },
  {
    name: "Seller Pro+",
    icon: Rocket,
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

export const PricingCards = () => {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your selling needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`glass-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-all duration-300 relative ${
                  plan.popular ? 'border-2 border-primary scale-105' : 'border border-border'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="gradient-primary px-4 py-1.5 rounded-full text-xs font-semibold text-white shadow-glow">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-soft">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={plan.variant} className="w-full" size="lg">
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include automatic blur detection • No hidden fees • Cancel anytime
        </p>
      </div>
    </section>
  );
};
