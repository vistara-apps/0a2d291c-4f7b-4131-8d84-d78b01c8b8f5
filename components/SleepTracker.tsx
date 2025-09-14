'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Moon, Play, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SleepTrackerProps {
  onStartSleep: () => void;
  onEndSleep: () => void;
  isTracking: boolean;
}

export function SleepTracker({ onStartSleep, onEndSleep, isTracking }: SleepTrackerProps) {
  return (
    <Card className="relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 sleep-gradient opacity-20" />
      
      <div className="relative z-10 text-center py-8">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          {isTracking ? 'Sleep session active' : 'Start sleep session'}
        </h2>
        
        {/* Sleep tracking button */}
        <div className="mb-8">
          <button
            onClick={isTracking ? onEndSleep : onStartSleep}
            className={cn(
              'relative w-32 h-32 rounded-full border-4 transition-all duration-300 flex items-center justify-center',
              isTracking 
                ? 'border-accent bg-accent/10 animate-pulse-slow' 
                : 'border-primary bg-primary/10 hover:bg-primary/20'
            )}
          >
            <div className="text-center">
              {isTracking ? (
                <>
                  <Square className="h-8 w-8 text-accent mx-auto mb-2" />
                  <span className="text-sm text-accent font-medium">Stop</span>
                </>
              ) : (
                <>
                  <Play className="h-8 w-8 text-primary mx-auto mb-2" />
                  <span className="text-sm text-primary font-medium">Start</span>
                </>
              )}
            </div>
          </button>
        </div>

        {isTracking && (
          <div className="text-center">
            <p className="text-muted-foreground text-sm mb-2">Sleep session started</p>
            <p className="text-accent font-medium">Sweet dreams! 🌙</p>
          </div>
        )}
      </div>
    </Card>
  );
}
