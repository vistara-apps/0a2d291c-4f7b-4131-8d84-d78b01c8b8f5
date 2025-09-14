'use client';

import { Home, Search, User, Moon, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface AppShellProps {
  children: React.ReactNode;
  activeTab?: 'home' | 'insights' | 'mindfulness' | 'profile';
}

export function AppShell({ children, activeTab = 'home' }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <Moon className="h-6 w-6 text-accent" />
            <h1 className="text-xl font-bold text-text-primary">DreamWeaver AI</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center">
              <User className="h-4 w-4 text-text-secondary" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-20">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-surface">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex items-center justify-around py-2">
              <Link href="/">
                <button
                  className={cn(
                    'flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200',
                    activeTab === 'home'
                      ? 'text-accent bg-accent/10'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <Home className="h-5 w-5" />
                  <span className="text-xs">Home</span>
                </button>
              </Link>

              <Link href="/insights">
                <button
                  className={cn(
                    'flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200',
                    activeTab === 'insights'
                      ? 'text-accent bg-accent/10'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <Search className="h-5 w-5" />
                  <span className="text-xs">Insights</span>
                </button>
              </Link>

              <Link href="/mindfulness">
                <button
                  className={cn(
                    'flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200',
                    activeTab === 'mindfulness'
                      ? 'text-accent bg-accent/10'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <Brain className="h-5 w-5" />
                  <span className="text-xs">Mindful</span>
                </button>
              </Link>

              <Link href="/profile">
                <button
                  className={cn(
                    'flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors duration-200',
                    activeTab === 'profile'
                      ? 'text-accent bg-accent/10'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  <User className="h-5 w-5" />
                  <span className="text-xs">Profile</span>
                </button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
