// Application configuration
export const APP_CONFIG = {
  name: 'DreamWeaver AI',
  version: '1.0.0',
  description: 'Unlock your best sleep with personalized AI insights',
  author: 'DreamWeaver Team',

  // API Configuration
  api: {
    openRouter: {
      baseUrl: 'https://openrouter.ai/api/v1',
      model: 'google/gemini-2.0-flash-001',
      maxTokens: 200,
      temperature: 0.7,
    },
    openai: {
      baseUrl: 'https://api.openai.com/v1',
      model: 'gpt-4',
      maxTokens: 200,
      temperature: 0.7,
    },
  },

  // Feature Flags
  features: {
    aiInsights: true,
    notifications: true,
    mindfulness: true,
    analytics: true,
    farcaster: false, // Enable when Farcaster integration is complete
    cloudSync: false, // Enable when cloud database is implemented
  },

  // UI Configuration
  ui: {
    maxRetries: 3,
    loadingTimeout: 10000, // 10 seconds
    notificationTimeout: 5000, // 5 seconds
    debounceDelay: 300, // 300ms
  },

  // Sleep Tracking Configuration
  sleep: {
    minDuration: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    maxDuration: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
    qualityThresholds: {
      excellent: 90,
      good: 75,
      fair: 60,
      poor: 45,
    },
  },

  // Mindfulness Configuration
  mindfulness: {
    meditation: {
      defaultDuration: 600, // 10 minutes in seconds
      maxDuration: 1800, // 30 minutes in seconds
      minDuration: 60, // 1 minute in seconds
    },
    breathing: {
      patterns: ['4-7-8', 'box', '4-4-6-2', 'simple'],
      defaultCycles: 4,
      maxCycles: 10,
    },
    ambient: {
      categories: ['nature', 'urban', 'white-noise', 'music'],
      defaultVolume: 0.5,
      maxVolume: 1.0,
      minVolume: 0.0,
    },
  },

  // Notification Configuration
  notifications: {
    morning: {
      enabled: true,
      hour: 8,
      minute: 0,
      title: '🌅 Good morning! How did you sleep?',
      body: 'Take a moment to log your sleep quality and start your day right.',
    },
    evening: {
      enabled: true,
      hour: 21,
      minute: 0,
      title: '🌙 Time to wind down for sleep',
      body: 'Consider a short meditation or breathing exercise before bed.',
    },
    insight: {
      enabled: true,
      title: '🧠 New Sleep Insight Available',
      body: 'Check out your personalized sleep recommendations.',
    },
    achievement: {
      enabled: true,
      title: '🏆 Achievement Unlocked!',
      body: 'Congratulations on your sleep improvement milestone!',
    },
  },

  // Analytics Configuration
  analytics: {
    enabled: true,
    events: {
      sleepStarted: 'sleep_session_started',
      sleepEnded: 'sleep_session_ended',
      journalSubmitted: 'journal_entry_submitted',
      insightGenerated: 'ai_insight_generated',
      meditationCompleted: 'meditation_session_completed',
      breathingCompleted: 'breathing_exercise_completed',
    },
  },

  // Storage Configuration
  storage: {
    keys: {
      user: 'dreamweaver_user',
      sleepSessions: 'dreamweaver_sleep_sessions',
      journalEntries: 'dreamweaver_journal_entries',
      coachingInsights: 'dreamweaver_coaching_insights',
      userPreferences: 'dreamweaver_user_preferences',
      appSettings: 'dreamweaver_app_settings',
    },
    maxItems: {
      sleepSessions: 1000,
      journalEntries: 1000,
      coachingInsights: 100,
    },
  },

  // Error Handling Configuration
  errors: {
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    timeout: 30000, // 30 seconds
    logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'error',
  },

  // Development Configuration
  development: {
    mockData: true,
    debugMode: process.env.NODE_ENV === 'development',
    apiDelay: 1000, // Simulate API delay in development
  },
} as const;

// Type definitions for configuration
export type AppConfig = typeof APP_CONFIG;
export type FeatureFlags = typeof APP_CONFIG.features;
export type NotificationConfig = typeof APP_CONFIG.notifications;
export type MindfulnessConfig = typeof APP_CONFIG.mindfulness;

// Helper functions
export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
  return APP_CONFIG.features[feature];
};

export const getApiConfig = (provider: 'openRouter' | 'openai') => {
  return APP_CONFIG.api[provider];
};

export const getNotificationConfig = (type: keyof NotificationConfig) => {
  return APP_CONFIG.notifications[type];
};

export const getMindfulnessConfig = (category: keyof MindfulnessConfig) => {
  return APP_CONFIG.mindfulness[category];
};

// Environment-specific configuration
export const getEnvConfig = () => {
  const env = process.env.NEXT_PUBLIC_APP_ENV || 'production';

  return {
    isDevelopment: env === 'development',
    isProduction: env === 'production',
    isTest: env === 'test',
    version: process.env.NEXT_PUBLIC_APP_VERSION || APP_CONFIG.version,
  };
};

// Validation helpers
export const validateConfig = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_OPENROUTER_API_KEY',
    'NEXT_PUBLIC_MINIKIT_API_KEY',
  ];

  const missing = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missing.length > 0) {
    console.warn('Missing required environment variables:', missing);
    return false;
  }

  return true;
};

// Export default configuration
export default APP_CONFIG;

