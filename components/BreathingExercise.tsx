'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardTitle } from './ui/Card';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreathingExerciseProps {
  onComplete?: () => void;
  onClose?: () => void;
}

type BreathingPhase = 'inhale' | 'hold' | 'exhale' | 'rest';

interface BreathingPattern {
  name: string;
  description: string;
  phases: {
    inhale: number;
    hold?: number;
    exhale: number;
    rest?: number;
  };
  cycles: number;
}

const BREATHING_PATTERNS: BreathingPattern[] = [
  {
    name: '4-7-8 Relaxation',
    description: 'Dr. Andrew Weil\'s technique for relaxation and sleep',
    phases: {
      inhale: 4,
      hold: 7,
      exhale: 8,
    },
    cycles: 4,
  },
  {
    name: 'Box Breathing',
    description: 'Military technique for stress relief and focus',
    phases: {
      inhale: 4,
      hold: 4,
      exhale: 4,
      rest: 4,
    },
    cycles: 5,
  },
  {
    name: '4-4-6-2 Energizing',
    description: 'Quick energy boost and mental clarity',
    phases: {
      inhale: 4,
      hold: 4,
      exhale: 6,
      rest: 2,
    },
    cycles: 6,
  },
  {
    name: 'Simple Deep Breathing',
    description: 'Basic relaxation technique for beginners',
    phases: {
      inhale: 5,
      exhale: 5,
    },
    cycles: 10,
  },
];

export function BreathingExercise({ onComplete, onClose }: BreathingExerciseProps) {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(BREATHING_PATTERNS[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>('inhale');
  const [currentCycle, setCurrentCycle] = useState(1);
  const [timeLeft, setTimeLeft] = useState(4);
  const [showInstructions, setShowInstructions] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const phaseOrder: BreathingPhase[] = ['inhale', 'hold', 'exhale', 'rest'].filter(
    phase => selectedPattern.phases[phase as keyof typeof selectedPattern.phases] !== undefined
  );

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Move to next phase
            const currentIndex = phaseOrder.indexOf(currentPhase);
            const nextIndex = (currentIndex + 1) % phaseOrder.length;

            if (nextIndex === 0) {
              // Completed a cycle
              setCurrentCycle(cycle => {
                if (cycle >= selectedPattern.cycles) {
                  // Exercise complete
                  setIsActive(false);
                  onComplete?.();
                  return cycle;
                }
                return cycle + 1;
              });
            }

            const nextPhase = phaseOrder[nextIndex];
            setCurrentPhase(nextPhase);
            return selectedPattern.phases[nextPhase as keyof typeof selectedPattern.phases] || 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, currentPhase, selectedPattern, phaseOrder, onComplete]);

  const handleStart = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setCurrentCycle(1);
    setTimeLeft(selectedPattern.phases.inhale);
    setShowInstructions(false);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleRestart = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setCurrentCycle(1);
    setTimeLeft(selectedPattern.phases.inhale);
    setShowInstructions(true);
  };

  const getPhaseColor = (phase: BreathingPhase): string => {
    switch (phase) {
      case 'inhale':
        return 'text-blue-400';
      case 'hold':
        return 'text-yellow-400';
      case 'exhale':
        return 'text-green-400';
      case 'rest':
        return 'text-purple-400';
      default:
        return 'text-text-secondary';
    }
  };

  const getPhaseInstruction = (phase: BreathingPhase): string => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly';
      case 'hold':
        return 'Hold your breath';
      case 'exhale':
        return 'Breathe out slowly';
      case 'rest':
        return 'Rest before next breath';
      default:
        return '';
    }
  };

  const getBreathingCircleSize = (): string => {
    if (!isActive) return 'scale-100';

    switch (currentPhase) {
      case 'inhale':
        return 'scale-125';
      case 'hold':
        return 'scale-125';
      case 'exhale':
        return 'scale-75';
      case 'rest':
        return 'scale-100';
      default:
        return 'scale-100';
    }
  };

  if (showInstructions) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardTitle className="text-lg font-semibold text-text-primary mb-4 flex items-center justify-between">
            <span>Breathing Exercises</span>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            )}
          </CardTitle>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              {BREATHING_PATTERNS.map((pattern) => (
                <button
                  key={pattern.name}
                  onClick={() => setSelectedPattern(pattern)}
                  className={cn(
                    'w-full p-4 rounded-lg border text-left transition-colors duration-200',
                    selectedPattern.name === pattern.name
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-surface bg-surface/50 text-text-primary hover:bg-surface/80'
                  )}
                >
                  <h3 className="font-medium mb-1">{pattern.name}</h3>
                  <p className="text-sm text-text-secondary">{pattern.description}</p>
                  <p className="text-xs text-text-secondary mt-1">
                    {pattern.cycles} cycles • {Object.entries(pattern.phases)
                      .map(([phase, duration]) => `${phase}: ${duration}s`)
                      .join(' • ')}
                  </p>
                </button>
              ))}
            </div>

            <Button onClick={handleStart} className="w-full">
              Start {selectedPattern.name}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardTitle className="text-lg font-semibold text-text-primary mb-4 flex items-center justify-between">
          <span>{selectedPattern.name}</span>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          )}
        </CardTitle>

        <CardContent className="space-y-6">
          {/* Progress */}
          <div className="text-center">
            <div className="text-2xl font-bold text-text-primary mb-2">
              Cycle {currentCycle} of {selectedPattern.cycles}
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-1000"
                style={{
                  width: `${(currentCycle / selectedPattern.cycles) * 100}%`
                }}
              />
            </div>
          </div>

          {/* Breathing Circle */}
          <div className="flex justify-center">
            <div
              className={cn(
                'w-32 h-32 rounded-full border-4 border-accent/30 flex items-center justify-center transition-all duration-1000',
                getBreathingCircleSize()
              )}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">
                  {timeLeft}
                </div>
                <div className={cn('text-sm font-medium', getPhaseColor(currentPhase))}>
                  {getPhaseInstruction(currentPhase)}
                </div>
              </div>
            </div>
          </div>

          {/* Current Phase Indicator */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              {phaseOrder.map((phase, index) => (
                <div
                  key={phase}
                  className={cn(
                    'w-3 h-3 rounded-full transition-colors duration-300',
                    currentPhase === phase ? getPhaseColor(phase).replace('text-', 'bg-') : 'bg-surface'
                  )}
                />
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
              className="p-3"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              onClick={isActive ? handlePause : handleStart}
              className="p-4 rounded-full"
              size="lg"
            >
              {isActive ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Pattern Info */}
          <div className="text-center text-sm text-text-secondary">
            <p>{selectedPattern.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

