'use client';

import { Card, CardContent } from './ui/Card';
import { formatDuration } from '@/lib/utils';
import { Moon, Clock, TrendingUp, Zap } from 'lucide-react';

interface SleepStatsProps {
  stats: {
    duration: number;
    quality: number;
    efficiency: number;
    consistency: number;
  };
}

export function SleepStats({ stats }: SleepStatsProps) {
  const statItems = [
    {
      label: 'Duration',
      value: formatDuration(stats.duration),
      icon: Clock,
      color: 'text-blue-400',
    },
    {
      label: 'Quality',
      value: `${stats.quality}/100`,
      icon: Moon,
      color: 'text-purple-400',
    },
    {
      label: 'Efficiency',
      value: `${stats.efficiency}%`,
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      label: 'Consistency',
      value: `${stats.consistency}%`,
      icon: Zap,
      color: 'text-accent',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {statItems.map(({ label, value, icon: Icon, color }) => (
        <Card key={label} className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-surface ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">{label}</p>
                <p className="text-lg font-semibold text-text-primary">{value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
