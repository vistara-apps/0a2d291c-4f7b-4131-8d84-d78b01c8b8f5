'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardTitle } from './ui/Card';
import { Textarea } from './ui/Textarea';
import { Coffee, Smartphone, Dumbbell, Book, Brain, Heart } from 'lucide-react';

interface JournalEntryFormProps {
  type: 'pre' | 'post';
  onSubmit: (data: { feelings: string; activities: string[] }) => void;
}

const preActivities = [
  { id: 'caffeine', label: 'Caffeine', icon: Coffee },
  { id: 'screen_time', label: 'Screen Time', icon: Smartphone },
  { id: 'exercise', label: 'Exercise', icon: Dumbbell },
  { id: 'reading', label: 'Reading', icon: Book },
  { id: 'meditation', label: 'Meditation', icon: Brain },
  { id: 'stress', label: 'Stress', icon: Heart },
];

export function JournalEntryForm({ type, onSubmit }: JournalEntryFormProps) {
  const [feelings, setFeelings] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const handleActivityToggle = (activityId: string) => {
    setSelectedActivities(prev =>
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ feelings, activities: selectedActivities });
    setFeelings('');
    setSelectedActivities([]);
  };

  return (
    <Card>
      <CardTitle className="text-lg font-semibold text-text-primary mb-4">
        {type === 'pre' ? 'Pre-sleep notes' : 'Post-sleep analysis'}
      </CardTitle>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activities Selection */}
          {type === 'pre' && (
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-3">
                Activities (last 4 hours)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {preActivities.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleActivityToggle(id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors duration-200 ${
                      selectedActivities.includes(id)
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-surface bg-surface/50 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Feelings/Notes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              {type === 'pre' ? 'How are you feeling?' : 'How did you sleep?'}
            </label>
            <Textarea
              value={feelings}
              onChange={(e) => setFeelings(e.target.value)}
              placeholder={
                type === 'pre'
                  ? 'Describe your mood, energy level, or any concerns...'
                  : 'How do you feel this morning? Any dreams or observations...'
              }
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Save {type === 'pre' ? 'Pre-sleep' : 'Post-sleep'} Notes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
