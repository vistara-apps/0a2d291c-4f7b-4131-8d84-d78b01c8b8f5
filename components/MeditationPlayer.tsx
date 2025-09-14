'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardTitle } from './ui/Card';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Meditation {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  category: 'sleep' | 'stress' | 'focus' | 'general';
  audioUrl?: string;
  instructions: string[];
}

interface MeditationPlayerProps {
  meditation: Meditation;
  onComplete?: () => void;
  onClose?: () => void;
}

export function MeditationPlayer({ meditation, onComplete, onClose }: MeditationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalDuration = meditation.duration * 60; // Convert to seconds
  const progress = (currentTime / totalDuration) * 100;

  // Simulated meditation timer (since we don't have actual audio files)
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;

          // Update instruction based on progress
          const instructionIndex = Math.floor((newTime / totalDuration) * meditation.instructions.length);
          setCurrentInstruction(Math.min(instructionIndex, meditation.instructions.length - 1));

          if (newTime >= totalDuration) {
            setIsPlaying(false);
            onComplete?.();
            return 0;
          }

          return newTime;
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
  }, [isPlaying, totalDuration, meditation.instructions.length, onComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setCurrentInstruction(0);
    setIsPlaying(false);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardTitle className="text-lg font-semibold text-text-primary mb-4 flex items-center justify-between">
          <span>{meditation.title}</span>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          )}
        </CardTitle>

        <CardContent className="space-y-6">
          {/* Progress Circle */}
          <div className="relative w-48 h-48 mx-auto">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(240 9% 20%)"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(46 96% 55%)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-2xl font-bold text-text-primary mb-1">
                {formatTime(currentTime)}
              </div>
              <div className="text-sm text-text-secondary">
                {formatTime(totalDuration)}
              </div>
            </div>
          </div>

          {/* Current Instruction */}
          <div className="text-center min-h-[3rem] flex items-center justify-center">
            <p className="text-text-primary text-sm leading-relaxed px-4">
              {meditation.instructions[currentInstruction] || 'Begin your meditation...'}
            </p>
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
              onClick={handlePlayPause}
              className="p-4 rounded-full"
              size="lg"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleMuteToggle}
              className="p-3"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Meditation Info */}
          <div className="text-center space-y-2">
            <p className="text-xs text-text-secondary">
              {meditation.category.charAt(0).toUpperCase() + meditation.category.slice(1)} Meditation
            </p>
            <p className="text-xs text-text-secondary">
              {meditation.duration} minutes • {meditation.instructions.length} steps
            </p>
          </div>

          {/* Breathing Guide (for breathing exercises) */}
          {meditation.category === 'stress' && (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-text-secondary">
                <span>Inhale</span>
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all duration-4000",
                  isPlaying ? "bg-accent scale-125" : "bg-surface"
                )} />
                <span>Exhale</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Hidden audio element for future audio integration */}
      <audio
        ref={audioRef}
        src={meditation.audioUrl}
        muted={isMuted}
        style={{ display: 'none' }}
      />
    </div>
  );
}

// Predefined meditation sessions
export const MEDITATION_SESSIONS: Meditation[] = [
  {
    id: 'sleep-wind-down',
    title: 'Wind Down for Sleep',
    description: 'A gentle meditation to help you relax and prepare for sleep.',
    duration: 10,
    category: 'sleep',
    instructions: [
      'Find a comfortable position in your bed.',
      'Close your eyes and take a deep breath in... and out.',
      'Notice the weight of your body sinking into the mattress.',
      'Let go of any tension in your shoulders and neck.',
      'Imagine a peaceful scene that brings you calm.',
      'Allow your thoughts to gently drift away.',
      'Focus on the rhythm of your breath.',
      'Feel yourself becoming more relaxed with each breath.',
      'Let go of the day and embrace the peace of sleep.',
      'Goodnight and sweet dreams.'
    ]
  },
  {
    id: 'stress-relief',
    title: 'Stress Relief Breathing',
    description: 'A quick breathing exercise to reduce stress and anxiety.',
    duration: 5,
    category: 'stress',
    instructions: [
      'Sit comfortably with your feet flat on the floor.',
      'Place one hand on your chest and one on your belly.',
      'Inhale slowly through your nose for 4 counts.',
      'Hold your breath for 4 counts.',
      'Exhale slowly through your mouth for 4 counts.',
      'Hold your breath for 4 counts.',
      'Repeat this cycle, focusing on the breath.',
      'Notice how your body begins to relax.',
      'Continue breathing deeply and slowly.',
      'Feel the stress melting away with each breath.'
    ]
  },
  {
    id: 'focus-meditation',
    title: 'Focus and Clarity',
    description: 'A meditation to improve concentration and mental clarity.',
    duration: 15,
    category: 'focus',
    instructions: [
      'Sit in a quiet place with good posture.',
      'Close your eyes and bring your attention to your breath.',
      'Notice each inhale and exhale without judgment.',
      'When your mind wanders, gently bring it back to your breath.',
      'Imagine your thoughts as clouds passing in the sky.',
      'Let them come and go without attachment.',
      'Focus on being present in this moment.',
      'Notice the sensations in your body.',
      'Allow yourself to be fully here and now.',
      'Continue observing your breath and thoughts.',
      'Feel your mind becoming clearer and more focused.',
      'When you\'re ready, slowly open your eyes.',
      'Carry this clarity with you throughout your day.',
      'Take a moment to appreciate your focused mind.',
      'You are ready to tackle your tasks with clarity.'
    ]
  },
  {
    id: 'morning-energy',
    title: 'Morning Energy Boost',
    description: 'Start your day with positive energy and intention.',
    duration: 8,
    category: 'general',
    instructions: [
      'Sit comfortably and take a deep breath.',
      'Set an intention for your day.',
      'Visualize yourself achieving your goals.',
      'Feel gratitude for this new day.',
      'Imagine positive energy flowing through you.',
      'Smile and feel the warmth in your heart.',
      'Take another deep breath and feel energized.',
      'You are ready to embrace the day.',
      'Carry this positive energy with you.'
    ]
  }
];

