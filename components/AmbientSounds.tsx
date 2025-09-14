'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardTitle } from './ui/Card';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AmbientSound {
  id: string;
  name: string;
  description: string;
  category: 'nature' | 'urban' | 'music' | 'white-noise';
  icon: string;
  duration?: number; // in minutes, undefined for loop
  audioUrl?: string;
  volume: number;
}

interface AmbientSoundsProps {
  onClose?: () => void;
}

const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: 'rain',
    name: 'Gentle Rain',
    description: 'Soft rainfall with occasional thunder',
    category: 'nature',
    icon: '🌧️',
    volume: 0.7,
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    description: 'Calming waves crashing on the shore',
    category: 'nature',
    icon: '🌊',
    volume: 0.6,
  },
  {
    id: 'forest',
    name: 'Forest Ambience',
    description: 'Birds chirping and gentle wind through trees',
    category: 'nature',
    icon: '🌲',
    volume: 0.5,
  },
  {
    id: 'cafe',
    name: 'Coffee Shop',
    description: 'Background chatter and coffee machine sounds',
    category: 'urban',
    icon: '☕',
    volume: 0.4,
  },
  {
    id: 'fireplace',
    name: 'Crackling Fire',
    description: 'Warm fireplace with occasional pops',
    category: 'nature',
    icon: '🔥',
    volume: 0.8,
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    description: 'Steady, consistent background noise',
    category: 'white-noise',
    icon: '📻',
    volume: 0.3,
  },
  {
    id: 'brown-noise',
    name: 'Brown Noise',
    description: 'Deeper, rumbling background noise',
    category: 'white-noise',
    icon: '🎵',
    volume: 0.4,
  },
  {
    id: 'piano',
    name: 'Soft Piano',
    description: 'Gentle piano melodies for focus',
    category: 'music',
    icon: '🎹',
    volume: 0.5,
  },
];

export function AmbientSounds({ onClose }: AmbientSoundsProps) {
  const [selectedSound, setSelectedSound] = useState<AmbientSound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Simulated audio playback (since we don't have actual audio files)
  useEffect(() => {
    if (isPlaying && selectedSound) {
      // Simulate audio progress for sounds with duration
      if (selectedSound.duration) {
        intervalRef.current = setInterval(() => {
          setCurrentTime(prev => {
            const newTime = prev + 1;
            const totalSeconds = selectedSound.duration! * 60;

            if (newTime >= totalSeconds) {
              setIsPlaying(false);
              return 0;
            }

            return newTime;
          });
        }, 1000);
      }
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
  }, [isPlaying, selectedSound]);

  const handleSoundSelect = (sound: AmbientSound) => {
    if (selectedSound?.id === sound.id) {
      // Toggle play/pause for same sound
      setIsPlaying(!isPlaying);
    } else {
      // Switch to new sound
      setSelectedSound(sound);
      setIsPlaying(true);
      setCurrentTime(0);
      setVolume(sound.volume);
      setIsMuted(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSoundsByCategory = (category: string) => {
    return AMBIENT_SOUNDS.filter(sound => sound.category === category);
  };

  const categories = ['nature', 'urban', 'white-noise', 'music'];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto max-h-[90vh] overflow-hidden">
        <CardTitle className="text-lg font-semibold text-text-primary mb-4 flex items-center justify-between">
          <span>Ambient Sounds</span>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          )}
        </CardTitle>

        <CardContent className="space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Now Playing */}
          {selectedSound && (
            <div className="bg-surface/50 rounded-lg p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedSound.icon}</span>
                <div>
                  <h3 className="font-medium text-text-primary">{selectedSound.name}</h3>
                  <p className="text-sm text-text-secondary">{selectedSound.description}</p>
                </div>
              </div>

              {/* Progress Bar (for timed sounds) */}
              {selectedSound.duration && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-text-secondary">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(selectedSound.duration * 60)}</span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${(currentTime / (selectedSound.duration * 60)) * 100}%`
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSoundSelect(selectedSound)}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>

                  {selectedSound.duration && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRestart}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMuteToggle}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">Vol</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                      className="w-16 h-1 bg-surface rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sound Categories */}
          <div className="space-y-4">
            {categories.map((category) => {
              const sounds = getSoundsByCategory(category);
              if (sounds.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="text-sm font-medium text-text-primary mb-3 capitalize">
                    {category.replace('-', ' ')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {sounds.map((sound) => (
                      <button
                        key={sound.id}
                        onClick={() => handleSoundSelect(sound)}
                        className={cn(
                          'p-3 rounded-lg border text-left transition-all duration-200 hover:scale-105',
                          selectedSound?.id === sound.id
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-surface bg-surface/50 text-text-primary hover:bg-surface/80'
                        )}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">{sound.icon}</span>
                          <span className="font-medium text-sm">{sound.name}</span>
                        </div>
                        <p className="text-xs text-text-secondary leading-tight">
                          {sound.description}
                        </p>
                        {selectedSound?.id === sound.id && isPlaying && (
                          <div className="mt-2 flex items-center space-x-1">
                            <div className="w-1 h-1 bg-accent rounded-full animate-pulse" />
                            <div className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tips */}
          <div className="bg-surface/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-text-primary mb-2">💡 Tips for Better Sleep</h4>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• Use ambient sounds 30-60 minutes before bedtime</li>
              <li>• Start with lower volume and adjust as needed</li>
              <li>• Nature sounds are great for relaxation</li>
              <li>• White noise can help mask disruptive sounds</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Hidden audio element for future audio integration */}
      {selectedSound && (
        <audio
          ref={audioRef}
          src={selectedSound.audioUrl}
          loop={!selectedSound.duration}
          volume={isMuted ? 0 : volume}
          style={{ display: 'none' }}
        />
      )}
    </div>
  );
}

