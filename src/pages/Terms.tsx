import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="frosted-glass rounded-2xl p-8 md:p-12 shadow-soft border border-border/50">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Terms and Conditions</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using BlurSell ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                BlurSell is an image processing service that automatically detects and blurs sensitive information such as license plates, house numbers, and serial numbers from images. The Service processes images in real-time and does not store your images permanently.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts and Subscriptions</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  <strong className="text-foreground">Free Tier:</strong> Users on the free tier are limited to 1 image per day. Processed images will include a watermark.
                </p>
                <p>
                  <strong className="text-foreground">Pro Subscription:</strong> Pro subscribers ($5/month) receive unlimited image processing, no watermarks, and priority processing.
                </p>
                <p>
                  <strong className="text-foreground">Pro+ Subscription:</strong> Pro+ subscribers ($9/month) receive all Pro benefits plus ultra-fast processing, highest detection accuracy, and early access to new features.
                </p>
                <p>
                  Subscriptions are billed monthly and can be cancelled at any time. Refunds are not provided for partial billing periods.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">You agree not to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Upload images containing illegal, harmful, or offensive content</li>
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to reverse engineer or compromise the Service's security</li>
                <li>Upload images larger than 10MB</li>
                <li>Use automated systems to abuse the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain all rights to images you upload. By using the Service, you grant BlurSell a limited, non-exclusive license to process your images solely for the purpose of providing the Service. BlurSell does not claim ownership of your images.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Privacy and Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                Images are processed in real-time and are not permanently stored on our servers. We do not share your images with third parties. For more information, please see our <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Service Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to maintain high availability but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or unforeseen circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                BlurSell is provided "as is" without warranties of any kind. We are not liable for any damages resulting from use of the Service, including but not limited to indirect, incidental, or consequential damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms, please contact us at <a href="mailto:mattwhittck@gmail.com" className="text-primary hover:underline">mattwhittck@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

