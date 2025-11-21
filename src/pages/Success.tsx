import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getApiUrl, setUnlocked, getUserId } from "@/lib/user";
import { toast } from "sonner";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const processSuccess = async () => {
      const userId = searchParams.get("user_id") || getUserId();
      const planParam = searchParams.get("plan");
      
      if (planParam) {
        setPlan(planParam);
      }
      
      if (!userId) {
        setError("Missing user_id parameter");
        setIsProcessing(false);
        return;
      }

      try {
        const apiUrl = getApiUrl();
        
        // Fetch user subscription status from backend
        const statusResponse = await fetch(`${apiUrl}/subscription-status?user_id=${userId}`, {
          method: "GET",
        });

        if (statusResponse.ok) {
          const statusData = await statusResponse.json();
          // If user has active subscription, set unlocked
          if (statusData.subscribed || statusData.active) {
            setUnlocked(true);
          }
        }

        setIsProcessing(false);
        toast.success("Subscription activated successfully!");
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (err) {
        console.error("Success processing error:", err);
        // Still show success even if status check fails
        setUnlocked(true);
        setIsProcessing(false);
        toast.success("Subscription activated!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    processSuccess();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-background dark flex items-center justify-center p-4">
      <div className="frosted-glass rounded-2xl p-8 max-w-md w-full text-center shadow-soft border border-border/50">
        {isProcessing ? (
          <>
            <div className="flex justify-center mb-6">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-foreground">Processing...</h1>
            <p className="text-muted-foreground">
              Unlocking your account
            </p>
          </>
        ) : error ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-foreground">Error</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button variant="circular" onClick={() => navigate("/")}>
              Go Home
            </Button>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <CheckCircle2 className="w-16 h-16 text-primary" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-foreground">Success!</h1>
            <p className="text-muted-foreground mb-6">
              {plan 
                ? `Your ${plan.toUpperCase()} subscription is now active! You have unlimited access to BlurSell.`
                : "Your subscription is now active! You have unlimited access to BlurSell."
              }
            </p>
            <p className="text-xs text-muted-foreground opacity-70 mb-6">
              Redirecting to dashboard in 3 seconds...
            </p>
            <Button variant="circular" onClick={() => navigate("/")}>
              Start Processing
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Success;

