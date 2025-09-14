// Simple AI service that doesn't require complex dependencies
export async function generateSleepInsight(
  sleepData: {
    duration: number;
    quality: number;
    preNotes: string;
    postNotes: string;
    activities: string[];
  }
): Promise<string> {
  // For now, return a simple static response
  // In production, this would integrate with an AI service
  return 'Focus on maintaining consistent sleep schedule and creating a relaxing bedtime routine.';
}


