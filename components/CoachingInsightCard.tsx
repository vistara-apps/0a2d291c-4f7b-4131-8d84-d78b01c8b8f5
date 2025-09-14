'use client';

import { Card, CardContent, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Lightbulb, ThumbsUp, X } from 'lucide-react';

interface CoachingInsightCardProps {
  insight: {
    id: string;
    recommendation: string;
    generatedAt: Date;
  };
  onMarkHelpful?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function CoachingInsightCard({ 
  insight, 
  onMarkHelpful, 
  onDismiss 
}: CoachingInsightCardProps) {
  return (
    <Card className="border-l-4 border-l-accent">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-accent" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-text-primary mb-2">
              AI Sleep Coach
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              {insight.recommendation}
            </p>
            
            <div className="flex items-center space-x-2">
              {onMarkHelpful && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkHelpful(insight.id)}
                  className="text-xs"
                >
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  Helpful
                </Button>
              )}
              
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(insight.id)}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  Dismiss
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
