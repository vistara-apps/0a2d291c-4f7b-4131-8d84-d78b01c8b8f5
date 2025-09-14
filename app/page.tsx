'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { SleepTracker } from '../components/SleepTracker';
import { JournalEntryForm } from '../components/JournalEntryForm';
import { CoachingInsightCard } from '../components/CoachingInsightCard';
import { SleepStats } from '../components/SleepStats';
import { SleepChart } from '../components/SleepChart';
import { generateSleepInsight } from '../lib/ai-service';
import { calculateSleepQuality } from '../lib/utils';
import { Sparkles, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const [isTracking, setIsTracking] = useState(false);
  const [sleepStartTime, setSleepStartTime] = useState<Date | null>(null);
  const [currentInsight, setCurrentInsight] = useState<string | null>(null);
  const [isGeneratingInsight, setIsGeneratingInsight] = useState(false);
  const [showJournalForm, setShowJournalForm] = useState<'pre' | 'post' | null>(null);

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
        <div style={{textAlign: 'center', padding: '24px 0'}}>
          <h2 style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '8px'}}>
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}! 🌙
          </h2>
          <p style={{color: '#cccccc'}}>
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
          <div style={{background: '#1a1a2e', border: '1px solid #374151', borderRadius: '8px', padding: '16px'}}>
            <div style={{paddingTop: '16px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <Sparkles style={{width: '20px', height: '20px', color: '#fbbf24'}} />
                <p style={{color: '#cccccc'}}>Generating personalized insights...</p>
              </div>
            </div>
          </div>
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
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px'}}>
            <h3 style={{fontSize: '18px', fontWeight: '600'}}>Sleep Overview</h3>
            <button style={{background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '14px'}}>
              <TrendingUp style={{width: '16px', height: '16px', marginRight: '8px'}} />
              View All
            </button>
          </div>
          <SleepStats stats={mockStats} />
        </div>

        {/* Sleep Chart */}
        <div style={{background: '#1a1a2e', border: '1px solid #374151', borderRadius: '8px', padding: '16px'}}>
          <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px'}}>
            Quality Trend (7 days)
          </h3>
          <div>
            <SleepChart data={mockChartData} />
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{background: '#1a1a2e', border: '1px solid #374151', borderRadius: '8px', padding: '16px'}}>
          <h3 style={{fontSize: '18px', fontWeight: '600', marginBottom: '16px'}}>
            Quick Actions
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <button
              style={{width: '100%', padding: '8px 16px', border: '1px solid #374151', background: 'transparent', color: '#ffffff', borderRadius: '6px', cursor: 'pointer', textAlign: 'left'}}
              onClick={() => setShowJournalForm('pre')}
            >
              📝 Add Pre-sleep Notes
            </button>
            <button
              style={{width: '100%', padding: '8px 16px', border: '1px solid #374151', background: 'transparent', color: '#ffffff', borderRadius: '6px', cursor: 'pointer', textAlign: 'left'}}
              onClick={() => setShowJournalForm('post')}
            >
              ☀️ Log Morning Feelings
            </button>
            <button style={{width: '100%', padding: '8px 16px', border: '1px solid #374151', background: 'transparent', color: '#ffffff', borderRadius: '6px', cursor: 'pointer', textAlign: 'left'}}>
              🧘 Start Meditation
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
