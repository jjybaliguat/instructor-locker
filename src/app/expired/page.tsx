import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ExpiredPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-red-100 dark:bg-yellow-900 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-foreground">
          Service Suspended
        </h1>

        <p className="text-muted-foreground">
          Your access has been temporarily disabled due to unpaid balance. Please settle your outstanding invoice to restore services.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/billing">
            <Button variant="default" className="w-full sm:w-auto">
              Go to Billing
            </Button>
          </Link>

          <Link href="/support">
            <Button variant="outline" className="w-full sm:w-auto">
              Contact Support
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Need help? Email us at <a href="mailto:support@example.com" className="underline">support@example.com</a>
        </p>
      </div>
    </div>
  );
}
