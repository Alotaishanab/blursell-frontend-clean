import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Privacy = () => {
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
          <h1 className="text-4xl font-bold mb-4 text-foreground">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                BlurSell ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our image processing service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  <strong className="text-foreground">Images:</strong> We process images you upload to detect and blur sensitive information. Images are processed in real-time and are not permanently stored on our servers.
                </p>
                <p>
                  <strong className="text-foreground">User ID:</strong> We generate a unique user ID stored locally in your browser to track usage limits and subscription status. This ID is not personally identifiable.
                </p>
                <p>
                  <strong className="text-foreground">Usage Data:</strong> We may collect anonymous usage statistics such as processing times and feature usage to improve our service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">We use collected information to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Process and blur sensitive information in your images</li>
                <li>Enforce usage limits for free tier users</li>
                <li>Manage subscription status and billing</li>
                <li>Improve service performance and accuracy</li>
                <li>Provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Image Storage and Processing</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  <strong className="text-foreground">No Permanent Storage:</strong> Your images are processed in real-time and are not permanently stored on our servers. Images are deleted immediately after processing is complete.
                </p>
                <p>
                  <strong className="text-foreground">Processing Location:</strong> Images are processed on secure servers. We do not share your images with third parties or use them for any purpose other than providing the Service.
                </p>
                <p>
                  <strong className="text-foreground">Security:</strong> All image processing occurs over encrypted connections (HTTPS) to protect your data in transit.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or rent your personal information or images to third parties. We may share aggregated, anonymized data for analytics purposes. We may disclose information if required by law or to protect our rights and safety.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Payment Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Payment processing is handled by Stripe, a third-party payment processor. We do not store your credit card information. Stripe's privacy policy governs the collection and use of payment information. Your subscription status is stored securely and linked to your user ID.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Cookies and Local Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use browser local storage to store your user ID and subscription status. This information remains on your device and is not transmitted to our servers except when necessary for service functionality. We do not use tracking cookies or third-party analytics cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access information we hold about you</li>
                <li>Request deletion of your data (note: images are not stored)</li>
                <li>Cancel your subscription at any time</li>
                <li>Opt out of any future data collection</li>
                <li>File a complaint with relevant data protection authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service is not intended for users under the age of 13. We do not knowingly collect information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be processed and stored in countries outside your jurisdiction. By using our Service, you consent to the transfer of your information to these countries.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy or our data practices, please contact us at <a href="mailto:mattwhittck@gmail.com" className="text-primary hover:underline">mattwhittck@gmail.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">14. GDPR Compliance</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you are located in the European Economic Area (EEA), you have additional rights under the General Data Protection Regulation (GDPR), including the right to data portability and the right to object to processing. To exercise these rights, please contact us at the email address above.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

