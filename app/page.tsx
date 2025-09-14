'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/AppShell';
import { SleepTracker } from '@/components/SleepTracker';
import { JournalEntryForm } from '@/components/JournalEntryForm';
import { CoachingInsightCard } from '@/components/CoachingInsightCard';
import { SleepStats } from '@/components/SleepStats';
import { SleepChart } from '@/components/SleepChart';
import { generateSleepInsight } from '@/lib/ai-service';
import { calculateSleepQuality } from '@/lib/utils';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, TrendingUp } from 'lucide-react';
import { useAppSettings } from '@/lib/hooks/useLocalStorage';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function HomePage() {
  const [isTracking, setIsTracking] = useState(false);
  const [sleepStartTime, setSleepStartTime] = useState<Date | null>(null);
  const [currentInsight, setCurrentInsight] = useState<string | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [showJournalForm, setShowJournalForm] = useState<'pre' | 'post' | null>(null);
  const [appSettings] = useAppSettings();
  const router = useRouter();

  // Check if onboarding is completed
  useEffect(() => {
    if (!appSettings.onboardingCompleted) {
      router.push('/onboarding');
    }
  }, [appSettings.onboardingCompleted, router]);

  // Show loading while checking onboarding status
  if (!appSettings.onboardingCompleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" text="Setting up your experience..." />
      </div>
    );
  }

  // Mock data for demonstration
  const mockStats = {
    duration: 450, // 7.5 hours
    quality: 78,
    efficiency: 85,
    consistency: 72,
  };

  const mockChartData = [
    { day: 'Mon', quality: 75, duration: 420 },
    { day: 'Tue', quality: 82, duration: 450 },
    { day: 'Wed', quality: 68, duration: 390 },
    { day: 'Thu', quality: 85, duration: 480 },
    { day: 'Fri', quality: 72, duration: 420 },
    { day: 'Sat', quality: 88, duration: 510 },
    { day: 'Sun', quality: 78, duration: 450 },
  ];

  const handleStartSleep = () => {
    setIsTracking(true);
    setSleepStartTime(new Date());
    setShowJournalForm('pre');
  };

  const handleEndSleep = () => {
    setIsTracking(false);
    setShowJournalForm('post');
  };

  const handleJournalSubmit = async (data: { feelings: string; activities: string[] }) => {
    if (showJournalForm === 'post' && sleepStartTime) {
      // Calculate sleep duration
      const endTime = new Date();
      const duration = Math.floor((endTime.getTime() - sleepStartTime.getTime()) / (1000 * 60));
      const quality = calculateSleepQuality(duration, data.activities);

      // Generate AI insight
      setIsGeneratingInsight(true);
      try {
        const insight = await generateSleepInsight({
          duration,
          quality,
          preNotes: '',
          postNotes: data.feelings,
          activities: data.activities,
        });
        setCurrentInsight(insight);
      } catch (error) {
        console.error('Error generating insight:', error);
      } finally {
        setIsGeneratingInsight(false);
      }
    }
    
    setShowJournalForm(null);
  };

  return (
    <AppShell activeTab="home">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}! 🌙
          </h2>
          <p className="text-text-secondary">
            Ready to track your sleep and unlock better rest?
          </p>
        </div>

        {/* Sleep Tracker */}
        <SleepTracker
          isTracking={isTracking}
          onStartSleep={handleStartSleep}
          onEndSleep={handleEndSleep}
        />

        {/* Journal Form */}
        {showJournalForm && (
          <JournalEntryForm
            type={showJournalForm}
            onSubmit={handleJournalSubmit}
          />
        )}

        {/* AI Insight */}
        {isGeneratingInsight && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Sparkles className="h-5 w-5 text-accent animate-spin" />
                <p className="text-text-secondary">Generating personalized insights...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {currentInsight && (
          <CoachingInsightCard
            insight={{
              id: '1',
              recommendation: currentInsight,
              generatedAt: new Date(),
            }}
            onMarkHelpful={(id) => console.log('Marked helpful:', id)}
            onDismiss={() => setCurrentInsight(null)}
          />
        )}

        {/* Sleep Stats */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Sleep Overview</h3>
            <Button variant="ghost" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          <SleepStats stats={mockStats} />
        </div>

        {/* Sleep Chart */}
        <Card>
          <CardTitle className="text-lg font-semibold text-text-primary mb-4">
            Quality Trend (7 days)
          </CardTitle>
          <CardContent>
            <SleepChart data={mockChartData} />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardTitle className="text-lg font-semibold text-text-primary mb-4">
            Quick Actions
          </CardTitle>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowJournalForm('pre')}
            >
              📝 Add Pre-sleep Notes
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setShowJournalForm('post')}
            >
              ☀️ Log Morning Feelings
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/mindfulness'}>
              🧘 Mindfulness Tools
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
