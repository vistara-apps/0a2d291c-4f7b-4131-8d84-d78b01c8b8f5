'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardTitle } from './ui/Card';
import { Bell, X, Check, CheckCheck, Settings } from 'lucide-react';
import { useNotifications } from '@/lib/hooks/useNotifications';
import { cn } from '@/lib/utils';

interface NotificationManagerProps {
  onClose?: () => void;
}

export function NotificationManager({ onClose }: NotificationManagerProps) {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    getUnreadCount,
    requestPermission,
    isSupported,
    getPermissionStatus,
  } = useNotifications();

  const [showSettings, setShowSettings] = useState(false);

  const handlePermissionRequest = async () => {
    const granted = await requestPermission();
    if (granted) {
      alert('Notifications enabled! You\'ll now receive reminders and insights.');
    } else {
      alert('Notification permission denied. You can enable it in your browser settings.');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'morning':
        return '🌅';
      case 'evening':
        return '🌙';
      case 'insight':
        return '🧠';
      case 'achievement':
        return '🏆';
      case 'reminder':
        return '⏰';
      default:
        return '🔔';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = getUnreadCount();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto max-h-[80vh] overflow-hidden">
        <CardTitle className="text-lg font-semibold text-text-primary mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-accent text-black text-xs px-2 py-1 rounded-full font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardTitle>

        <CardContent className="space-y-4">
          {/* Notification Settings */}
          {showSettings && (
            <div className="p-4 bg-surface/50 rounded-lg space-y-3">
              <h4 className="font-medium text-text-primary">Notification Settings</h4>

              {!isSupported() ? (
                <p className="text-sm text-text-secondary">
                  Notifications are not supported in this browser.
                </p>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-primary">Browser Notifications</span>
                    <span className={cn(
                      'text-xs px-2 py-1 rounded',
                      getPermissionStatus() === 'granted'
                        ? 'bg-green-500/20 text-green-400'
                        : getPermissionStatus() === 'denied'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    )}>
                      {getPermissionStatus() === 'granted' ? 'Enabled' :
                       getPermissionStatus() === 'denied' ? 'Blocked' : 'Request'}
                    </span>
                  </div>

                  {getPermissionStatus() === 'default' && (
                    <Button onClick={handlePermissionRequest} size="sm" className="w-full">
                      Enable Notifications
                    </Button>
                  )}

                  {getPermissionStatus() === 'denied' && (
                    <p className="text-xs text-text-secondary">
                      Notifications are blocked. Enable them in your browser settings.
                    </p>
                  )}
                </div>
              )}

              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <Button onClick={markAllAsRead} size="sm" variant="outline" className="flex-1">
                    <CheckCheck className="h-4 w-4 mr-2" />
                    Mark All Read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button onClick={clearAll} size="sm" variant="outline" className="flex-1">
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-text-secondary mx-auto mb-4 opacity-50" />
                <p className="text-text-secondary">No notifications yet</p>
                <p className="text-xs text-text-secondary mt-1">
                  You'll receive reminders and insights here
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-3 rounded-lg border transition-colors duration-200',
                    notification.read
                      ? 'bg-surface/30 border-surface'
                      : 'bg-accent/10 border-accent/20'
                  )}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="font-medium text-text-primary text-sm">
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeNotification(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-text-secondary mt-1">
                        {notification.body}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-text-secondary">
                          {formatTime(notification.timestamp)}
                        </span>

                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 px-2 text-xs"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Actions */}
          {notifications.length > 0 && (
            <div className="flex space-x-2 pt-2 border-t border-surface">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="flex-1"
              >
                Mark All Read ({unreadCount})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                className="flex-1"
              >
                Clear All
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

