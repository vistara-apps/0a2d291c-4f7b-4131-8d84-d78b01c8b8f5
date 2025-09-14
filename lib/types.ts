export interface User {
  userId: string;
  displayName: string;
  farcasterId?: string;
  createdAt: Date;
}

export interface SleepSession {
  sessionId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  qualityScore: number;
  notes?: string;
}

export interface JournalEntry {
  entryId: string;
  userId: string;
  sessionId?: string;
  entryType: 'pre' | 'post';
  habitsLog: Record<string, any>;
  feelingsLog: string;
  createdAt: Date;
}

export interface CoachingInsight {
  insightId: string;
  userId: string;
  sessionId?: string;
  recommendation: string;
  generatedAt: Date;
}

export interface SleepData {
  duration: number;
  quality: number;
  activities: string[];
}
