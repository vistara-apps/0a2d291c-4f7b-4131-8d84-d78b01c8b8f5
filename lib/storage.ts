import { User, SleepSession, JournalEntry, CoachingInsight } from './types';

const STORAGE_KEYS = {
  USER: 'dreamweaver_user',
  SLEEP_SESSIONS: 'dreamweaver_sleep_sessions',
  JOURNAL_ENTRIES: 'dreamweaver_journal_entries',
  COACHING_INSIGHTS: 'dreamweaver_coaching_insights',
  USER_PREFERENCES: 'dreamweaver_user_preferences',
  APP_SETTINGS: 'dreamweaver_app_settings',
} as const;

// Generic storage utilities
export class LocalStorage {
  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage for key ${key}:`, error);
      return null;
    }
  }

  static set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage for key ${key}:`, error);
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage for key ${key}:`, error);
    }
  }

  static clear(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}

// User data management
export class UserStorage {
  static getUser(): User | null {
    return LocalStorage.get<User>(STORAGE_KEYS.USER);
  }

  static setUser(user: User): void {
    LocalStorage.set(STORAGE_KEYS.USER, user);
  }

  static updateUser(updates: Partial<User>): void {
    const currentUser = this.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      this.setUser(updatedUser);
    }
  }

  static clearUser(): void {
    LocalStorage.remove(STORAGE_KEYS.USER);
  }
}

// Sleep session management
export class SleepSessionStorage {
  static getAllSessions(): SleepSession[] {
    return LocalStorage.get<SleepSession[]>(STORAGE_KEYS.SLEEP_SESSIONS) || [];
  }

  static getSessionById(sessionId: string): SleepSession | null {
    const sessions = this.getAllSessions();
    return sessions.find(session => session.sessionId === sessionId) || null;
  }

  static addSession(session: SleepSession): void {
    const sessions = this.getAllSessions();
    sessions.push(session);
    LocalStorage.set(STORAGE_KEYS.SLEEP_SESSIONS, sessions);
  }

  static updateSession(sessionId: string, updates: Partial<SleepSession>): void {
    const sessions = this.getAllSessions();
    const index = sessions.findIndex(session => session.sessionId === sessionId);

    if (index !== -1) {
      sessions[index] = { ...sessions[index], ...updates };
      LocalStorage.set(STORAGE_KEYS.SLEEP_SESSIONS, sessions);
    }
  }

  static deleteSession(sessionId: string): void {
    const sessions = this.getAllSessions();
    const filteredSessions = sessions.filter(session => session.sessionId !== sessionId);
    LocalStorage.set(STORAGE_KEYS.SLEEP_SESSIONS, filteredSessions);
  }

  static getSessionsByDateRange(startDate: Date, endDate: Date): SleepSession[] {
    const sessions = this.getAllSessions();
    return sessions.filter(session => {
      const sessionDate = new Date(session.startTime);
      return sessionDate >= startDate && sessionDate <= endDate;
    });
  }
}

// Journal entry management
export class JournalEntryStorage {
  static getAllEntries(): JournalEntry[] {
    return LocalStorage.get<JournalEntry[]>(STORAGE_KEYS.JOURNAL_ENTRIES) || [];
  }

  static getEntryById(entryId: string): JournalEntry | null {
    const entries = this.getAllEntries();
    return entries.find(entry => entry.entryId === entryId) || null;
  }

  static addEntry(entry: JournalEntry): void {
    const entries = this.getAllEntries();
    entries.push(entry);
    LocalStorage.set(STORAGE_KEYS.JOURNAL_ENTRIES, entries);
  }

  static updateEntry(entryId: string, updates: Partial<JournalEntry>): void {
    const entries = this.getAllEntries();
    const index = entries.findIndex(entry => entry.entryId === entryId);

    if (index !== -1) {
      entries[index] = { ...entries[index], ...updates };
      LocalStorage.set(STORAGE_KEYS.JOURNAL_ENTRIES, entries);
    }
  }

  static deleteEntry(entryId: string): void {
    const entries = this.getAllEntries();
    const filteredEntries = entries.filter(entry => entry.entryId !== entryId);
    LocalStorage.set(STORAGE_KEYS.JOURNAL_ENTRIES, filteredEntries);
  }

  static getEntriesBySessionId(sessionId: string): JournalEntry[] {
    const entries = this.getAllEntries();
    return entries.filter(entry => entry.sessionId === sessionId);
  }

  static getEntriesByType(type: 'pre' | 'post'): JournalEntry[] {
    const entries = this.getAllEntries();
    return entries.filter(entry => entry.entryType === type);
  }
}

// Coaching insight management
export class CoachingInsightStorage {
  static getAllInsights(): CoachingInsight[] {
    return LocalStorage.get<CoachingInsight[]>(STORAGE_KEYS.COACHING_INSIGHTS) || [];
  }

  static getInsightById(insightId: string): CoachingInsight | null {
    const insights = this.getAllInsights();
    return insights.find(insight => insight.insightId === insightId) || null;
  }

  static addInsight(insight: CoachingInsight): void {
    const insights = this.getAllInsights();
    insights.push(insight);
    LocalStorage.set(STORAGE_KEYS.COACHING_INSIGHTS, insights);
  }

  static updateInsight(insightId: string, updates: Partial<CoachingInsight>): void {
    const insights = this.getAllInsights();
    const index = insights.findIndex(insight => insight.insightId === insightId);

    if (index !== -1) {
      insights[index] = { ...insights[index], ...updates };
      LocalStorage.set(STORAGE_KEYS.COACHING_INSIGHTS, insights);
    }
  }

  static deleteInsight(insightId: string): void {
    const insights = this.getAllInsights();
    const filteredInsights = insights.filter(insight => insight.insightId !== insightId);
    LocalStorage.set(STORAGE_KEYS.COACHING_INSIGHTS, filteredInsights);
  }

  static getInsightsByUserId(userId: string): CoachingInsight[] {
    const insights = this.getAllInsights();
    return insights.filter(insight => insight.userId === userId);
  }

  static getRecentInsights(limit: number = 10): CoachingInsight[] {
    const insights = this.getAllInsights();
    return insights
      .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())
      .slice(0, limit);
  }
}

// User preferences management
export interface UserPreferences {
  notifications: {
    morningReminder: boolean;
    eveningReminder: boolean;
    insightNotifications: boolean;
  };
  sleepGoals: {
    targetDuration: number; // in minutes
    targetQuality: number; // percentage
  };
  privacy: {
    shareInsights: boolean;
    analyticsEnabled: boolean;
  };
  theme: 'dark' | 'light' | 'auto';
}

export class UserPreferencesStorage {
  static getPreferences(): UserPreferences {
    const defaultPreferences: UserPreferences = {
      notifications: {
        morningReminder: true,
        eveningReminder: true,
        insightNotifications: true,
      },
      sleepGoals: {
        targetDuration: 480, // 8 hours
        targetQuality: 80,
      },
      privacy: {
        shareInsights: false,
        analyticsEnabled: true,
      },
      theme: 'dark',
    };

    return LocalStorage.get<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES) || defaultPreferences;
  }

  static setPreferences(preferences: UserPreferences): void {
    LocalStorage.set(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  static updatePreferences(updates: Partial<UserPreferences>): void {
    const currentPreferences = this.getPreferences();
    const updatedPreferences = { ...currentPreferences, ...updates };
    this.setPreferences(updatedPreferences);
  }
}

// App settings management
export interface AppSettings {
  onboardingCompleted: boolean;
  lastSyncDate?: Date;
  version: string;
  firstLaunchDate: Date;
}

export class AppSettingsStorage {
  static getSettings(): AppSettings {
    const defaultSettings: AppSettings = {
      onboardingCompleted: false,
      version: '1.0.0',
      firstLaunchDate: new Date(),
    };

    return LocalStorage.get<AppSettings>(STORAGE_KEYS.APP_SETTINGS) || defaultSettings;
  }

  static setSettings(settings: AppSettings): void {
    LocalStorage.set(STORAGE_KEYS.APP_SETTINGS, settings);
  }

  static updateSettings(updates: Partial<AppSettings>): void {
    const currentSettings = this.getSettings();
    const updatedSettings = { ...currentSettings, ...updates };
    this.setSettings(updatedSettings);
  }
}

// Data export/import utilities
export class DataExport {
  static exportAllData() {
    const data = {
      user: UserStorage.getUser(),
      sleepSessions: SleepSessionStorage.getAllSessions(),
      journalEntries: JournalEntryStorage.getAllEntries(),
      coachingInsights: CoachingInsightStorage.getAllInsights(),
      preferences: UserPreferencesStorage.getPreferences(),
      settings: AppSettingsStorage.getSettings(),
      exportDate: new Date(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `dreamweaver-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static async importData(jsonData: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonData);

      if (data.user) UserStorage.setUser(data.user);
      if (data.sleepSessions) LocalStorage.set(STORAGE_KEYS.SLEEP_SESSIONS, data.sleepSessions);
      if (data.journalEntries) LocalStorage.set(STORAGE_KEYS.JOURNAL_ENTRIES, data.journalEntries);
      if (data.coachingInsights) LocalStorage.set(STORAGE_KEYS.COACHING_INSIGHTS, data.coachingInsights);
      if (data.preferences) UserPreferencesStorage.setPreferences(data.preferences);
      if (data.settings) AppSettingsStorage.setSettings(data.settings);

      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

// Data synchronization utilities (for future cloud integration)
export class DataSync {
  static async syncToCloud(): Promise<boolean> {
    // Placeholder for cloud sync implementation
    // This would integrate with a backend service
    console.log('Cloud sync not yet implemented');
    return false;
  }

  static async syncFromCloud(): Promise<boolean> {
    // Placeholder for cloud sync implementation
    console.log('Cloud sync not yet implemented');
    return false;
  }

  static getLastSyncDate(): Date | null {
    const settings = AppSettingsStorage.getSettings();
    return settings.lastSyncDate || null;
  }

  static updateLastSyncDate(): void {
    AppSettingsStorage.updateSettings({ lastSyncDate: new Date() });
  }
}

