'use client';

import { Button } from '../components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground mb-6">
          We encountered an error while loading DreamWeaver AI. Please try again.
        </p>
        <Button onClick={reset} className="w-full">
          Try Again
        </Button>
      </div>
    </div>
  );
}
