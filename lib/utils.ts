import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function calculateSleepQuality(
  duration: number,
  activities: string[]
): number {
  let score = 50; // Base score
  
  // Duration scoring (optimal 7-9 hours)
  if (duration >= 420 && duration <= 540) { // 7-9 hours
    score += 30;
  } else if (duration >= 360 && duration < 420) { // 6-7 hours
    score += 20;
  } else if (duration > 540 && duration <= 600) { // 9-10 hours
    score += 20;
  } else {
    score += 10;
  }
  
  // Activity impact
  const negativeActivities = ['caffeine', 'screen_time', 'stress'];
  const positiveActivities = ['exercise', 'meditation', 'reading'];
  
  activities.forEach(activity => {
    if (negativeActivities.includes(activity)) {
      score -= 10;
    } else if (positiveActivities.includes(activity)) {
      score += 10;
    }
  });
  
  return Math.max(0, Math.min(100, score));
}
