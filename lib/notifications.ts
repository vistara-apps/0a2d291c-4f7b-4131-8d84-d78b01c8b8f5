export interface NotificationData {
  id: string;
  title: string;
  body: string;
  type: 'morning' | 'evening' | 'insight' | 'achievement' | 'reminder';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface NotificationPreferences {
  morningReminder: boolean;
  eveningReminder: boolean;
  insightNotifications: boolean;
  achievementNotifications: boolean;
}

// Browser notification utilities
export class BrowserNotifications {
  static async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  static async showNotification(
    title: string,
    options: NotificationOptions = {}
  ): Promise<Notification | null> {
    if (Notification.permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }

    try {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });

      // Auto-close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      return null;
    }
  }

  static async showSleepReminder(type: 'morning' | 'evening'): Promise<void> {
    const title = type === 'morning'
      ? '🌅 Good morning! How did you sleep?'
      : '🌙 Time to wind down for sleep';

    const body = type === 'morning'
      ? 'Take a moment to log your sleep quality and start your day right.'
      : 'Consider a short meditation or breathing exercise before bed.';

    await this.showNotification(title, {
      body,
      tag: `sleep-${type}`,
      requireInteraction: false,
      silent: false,
    });
  }

  static async showInsightNotification(insight: string): Promise<void> {
    await this.showNotification('🧠 New Sleep Insight Available', {
      body: insight.substring(0, 100) + (insight.length > 100 ? '...' : ''),
      tag: 'sleep-insight',
      requireInteraction: true,
    });
  }

  static async showAchievementNotification(achievement: string): Promise<void> {
    await this.showNotification('🏆 Achievement Unlocked!', {
      body: achievement,
      tag: 'sleep-achievement',
      requireInteraction: true,
    });
  }
}

// In-app notification management
export class InAppNotifications {
  private static notifications: NotificationData[] = [];
  private static listeners: ((notifications: NotificationData[]) => void)[] = [];

  static subscribe(listener: (notifications: NotificationData[]) => void): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  static notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  static addNotification(notification: Omit<NotificationData, 'id' | 'timestamp' | 'read'>): string {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const fullNotification: NotificationData = {
      ...notification,
      id,
      timestamp: new Date(),
      read: false,
    };

    this.notifications.unshift(fullNotification);
    this.notifyListeners();

    // Keep only last 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }

    return id;
  }

  static markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.notifyListeners();
    }
  }

  static markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.notifyListeners();
  }

  static removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  static clearAll(): void {
    this.notifications = [];
    this.notifyListeners();
  }

  static getNotifications(): NotificationData[] {
    return [...this.notifications];
  }

  static getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Predefined notification creators
  static createMorningReminder(): string {
    return this.addNotification({
      title: '🌅 Morning Sleep Check-in',
      body: 'How did you sleep last night? Take a moment to log your sleep quality.',
      type: 'morning',
      actionUrl: '/?tab=journal',
    });
  }

  static createEveningReminder(): string {
    return this.addNotification({
      title: '🌙 Evening Wind-down',
      body: 'Time to prepare for a good night\'s sleep. Consider a short meditation.',
      type: 'evening',
      actionUrl: '/mindfulness',
    });
  }

  static createInsightNotification(insight: string): string {
    return this.addNotification({
      title: '🧠 New AI Insight',
      body: insight,
      type: 'insight',
      actionUrl: '/insights',
    });
  }

  static createAchievementNotification(achievement: string): string {
    return this.addNotification({
      title: '🏆 Achievement Unlocked!',
      body: achievement,
      type: 'achievement',
    });
  }
}

// Scheduled notification system
export class NotificationScheduler {
  private static intervals: NodeJS.Timeout[] = [];
  private static timeouts: NodeJS.Timeout[] = [];

  static scheduleDailyReminder(
    type: 'morning' | 'evening',
    hour: number,
    minute: number = 0,
    preferences: NotificationPreferences
  ): void {
    // Clear existing intervals
    this.clearAll();

    if (type === 'morning' && !preferences.morningReminder) return;
    if (type === 'evening' && !preferences.eveningReminder) return;

    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(hour, minute, 0, 0);

    // If target time has passed today, schedule for tomorrow
    if (targetTime <= now) {
      targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeUntilTarget = targetTime.getTime() - now.getTime();

    // Schedule initial timeout
    const timeout = setTimeout(() => {
      this.triggerReminder(type);

      // Then schedule daily interval
      const interval = setInterval(() => {
        this.triggerReminder(type);
      }, 24 * 60 * 60 * 1000); // 24 hours

      this.intervals.push(interval);
    }, timeUntilTarget);

    this.timeouts.push(timeout);
  }

  static triggerReminder(type: 'morning' | 'evening'): void {
    // Show browser notification
    BrowserNotifications.showSleepReminder(type);

    // Add in-app notification
    if (type === 'morning') {
      InAppNotifications.createMorningReminder();
    } else {
      InAppNotifications.createEveningReminder();
    }
  }

  static scheduleInsightNotification(insight: string): void {
    // Show immediately for insights
    BrowserNotifications.showInsightNotification(insight);
    InAppNotifications.createInsightNotification(insight);
  }

  static scheduleAchievementNotification(achievement: string): void {
    // Show immediately for achievements
    BrowserNotifications.showAchievementNotification(achievement);
    InAppNotifications.createAchievementNotification(achievement);
  }

  static clearAll(): void {
    this.intervals.forEach(interval => clearInterval(interval));
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.intervals = [];
    this.timeouts = [];
  }

  static rescheduleAll(preferences: NotificationPreferences): void {
    this.clearAll();

    // Schedule morning reminder at 8 AM
    this.scheduleDailyReminder('morning', 8, 0, preferences);

    // Schedule evening reminder at 9 PM
    this.scheduleDailyReminder('evening', 21, 0, preferences);
  }
}

// Notification permission and setup utilities
export class NotificationSetup {
  static async initialize(): Promise<void> {
    // Request notification permission on first load
    const permission = await BrowserNotifications.requestPermission();

    if (permission === 'granted') {
      console.log('Notification permission granted');
    } else {
      console.log('Notification permission denied');
    }
  }

  static async checkAndRequestPermission(): Promise<boolean> {
    const permission = await BrowserNotifications.requestPermission();
    return permission === 'granted';
  }

  static isSupported(): boolean {
    return 'Notification' in window;
  }

  static getPermissionStatus(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }
}

// Export types and utilities
export type { NotificationData, NotificationPreferences };
export {
  BrowserNotifications,
  InAppNotifications,
  NotificationScheduler,
  NotificationSetup,
};

