# DreamWeaver AI 🌙

**Unlock your best sleep with personalized AI insights.**

A comprehensive sleep tracker and analyzer app that uses pre/post sleep journaling and AI coaching to improve sleep quality for busy professionals. Built as a Base Mini App with Farcaster integration.

## ✨ Features

### Core Features
- **Automated Sleep Tracking**: Passive sleep duration and quality monitoring
- **Pre/Post Sleep Journaling**: Structured habit logging and sleep observations
- **AI-Driven Sleep Coaching**: Personalized recommendations powered by advanced AI
- **Mindfulness & Relaxation Tools**: Guided meditations, breathing exercises, and ambient sounds
- **Advanced Analytics**: Sleep trend analysis and performance insights
- **Farcaster Integration**: Social features and frame sharing
- **Base Mini App**: Seamless integration with the Base ecosystem

### Technical Features
- **Production Ready**: Error boundaries, loading states, and comprehensive error handling
- **Offline Support**: Local storage with optional cloud synchronization
- **Notification System**: Customizable reminders and insights
- **Responsive Design**: Optimized for mobile and desktop
- **Accessibility**: WCAG compliant with screen reader support
- **Performance Optimized**: Fast loading with code splitting and lazy loading

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Coinbase MiniKit API key
- OpenRouter or OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/0a2d291c-4f7b-4131-8d84-d78b01c8b8f5.git
   cd dreamweaver-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```env
   NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key_here
   NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### First Time Setup
1. Complete the onboarding flow to set up your profile and preferences
2. Configure your sleep goals and notification preferences
3. Start tracking your first night's sleep

### Daily Workflow
1. **Evening**: Log pre-sleep habits and use mindfulness tools
2. **Sleep**: Use the sleep tracker to monitor your sleep session
3. **Morning**: Log post-sleep feelings and review AI insights
4. **Throughout Day**: Access insights and track progress

### Features Overview

#### Sleep Tracking
- Start/end sleep sessions with one tap
- Automatic duration and quality calculation
- Real-time sleep session monitoring

#### Journaling
- Pre-sleep: Log caffeine, screen time, exercise, reading, meditation, stress
- Post-sleep: Record feelings, observations, and sleep quality
- Structured prompts for consistent data collection

#### AI Coaching
- Personalized sleep recommendations
- Habit correlation analysis
- Actionable improvement suggestions
- Powered by advanced AI models

#### Mindfulness Tools
- **Guided Meditations**: 5-15 minute sessions for different purposes
- **Breathing Exercises**: 4-7-8, Box breathing, and custom patterns
- **Ambient Sounds**: Nature, urban, white noise, and music options
- **Progress Tracking**: Session history and streak counters

#### Analytics Dashboard
- Sleep quality trends over time
- Factor analysis (caffeine, exercise, screen time impact)
- Goal progress tracking
- Achievement system

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Beautiful icons
- **Recharts**: Data visualization

### Backend & APIs
- **OpenRouter/OpenAI**: AI coaching and insights
- **Coinbase MiniKit**: Base ecosystem integration
- **Local Storage**: Offline data persistence
- **Browser Notifications**: Native notification support

### Key Libraries
- `@coinbase/minikit`: Base Mini App functionality
- `@coinbase/onchainkit`: Web3 integration
- `openai`: AI API client
- `recharts`: Chart components
- `clsx`: Conditional styling
- `class-variance-authority`: Component variants

## 📁 Project Structure

```
dreamweaver-ai/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles
│   ├── insights/                # Insights dashboard
│   ├── mindfulness/             # Mindfulness tools
│   ├── profile/                 # User profile
│   └── onboarding/              # Onboarding flow
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── AppShell.tsx             # Main app layout
│   ├── SleepTracker.tsx         # Sleep tracking
│   ├── JournalEntryForm.tsx     # Journaling interface
│   ├── MeditationPlayer.tsx     # Meditation sessions
│   ├── BreathingExercise.tsx    # Breathing exercises
│   ├── AmbientSounds.tsx        # Sound library
│   ├── CoachingInsightCard.tsx  # AI insights display
│   ├── SleepStats.tsx           # Statistics display
│   ├── SleepChart.tsx           # Data visualization
│   ├── NotificationManager.tsx  # Notification system
│   ├── ErrorBoundary.tsx        # Error handling
│   └── LoadingSpinner.tsx       # Loading states
├── lib/                         # Utility libraries
│   ├── ai-service.ts            # AI integration
│   ├── storage.ts               # Data persistence
│   ├── database.ts              # Database abstraction
│   ├── notifications.ts         # Notification system
│   ├── utils.ts                 # Helper functions
│   └── hooks/                   # Custom React hooks
├── public/                      # Static assets
└── types/                       # TypeScript definitions
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_OPENROUTER_API_KEY` | OpenRouter API key for AI | Yes |
| `NEXT_PUBLIC_MINIKIT_API_KEY` | Coinbase MiniKit API key | Yes |
| `NEXT_PUBLIC_OPENAI_API_KEY` | Alternative OpenAI API key | Optional |
| `NEXT_PUBLIC_APP_ENV` | Environment (development/production) | Optional |
| `NEXT_PUBLIC_APP_VERSION` | App version | Optional |

### API Keys Setup

1. **OpenRouter**: Visit [openrouter.ai](https://openrouter.ai) and create an account
2. **Coinbase MiniKit**: Visit Coinbase Developer Platform and create a MiniKit app
3. **OpenAI**: Optional, visit [platform.openai.com](https://platform.openai.com) for direct API access

## 🎨 Design System

### Colors
- **Background**: `hsl(240 9% 15%)` - Deep navy
- **Accent**: `hsl(46 96% 55%)` - Golden yellow
- **Primary**: `hsl(220 96% 55%)` - Bright blue
- **Surface**: `hsl(240 9% 20%)` - Dark gray
- **Text Primary**: `hsl(0 0% 95%)` - Off-white
- **Text Secondary**: `hsl(0 0% 70%)` - Light gray

### Typography
- **Display**: 5xl font-bold for headings
- **Headline**: 2xl font-semibold for section titles
- **Body**: base font-normal for content
- **Caption**: sm font-normal for metadata

### Components
- **AppShell**: Main navigation and layout
- **SleepTracker**: Circular sleep session control
- **JournalEntryForm**: Structured data input
- **CoachingInsightCard**: AI recommendation display
- **MeditationPlayer**: Guided session interface
- **SleepChart**: Trend visualization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm start
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow existing component patterns
- Add proper error handling
- Include loading states
- Test on multiple devices
- Follow accessibility guidelines

## 📊 Performance

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 90+

### Bundle Analysis
- Main bundle: < 200KB gzipped
- Vendor chunks: Optimized splitting
- Images: WebP format with fallbacks
- Fonts: Self-hosted with preloading

## 🔒 Security

### Data Privacy
- All sleep data stored locally by default
- Optional cloud synchronization with user consent
- No data sharing without explicit permission
- End-to-end encryption for sensitive data

### API Security
- API keys stored securely in environment variables
- Rate limiting and request validation
- Secure HTTPS communication
- Input sanitization and validation

## 🐛 Troubleshooting

### Common Issues

**AI Insights Not Working**
- Check OpenRouter API key configuration
- Verify network connectivity
- Check browser console for errors

**Notifications Not Appearing**
- Grant browser notification permissions
- Check system notification settings
- Verify notification preferences in app

**Sleep Tracking Issues**
- Ensure device sensors are accessible
- Check for background process restrictions
- Verify local storage permissions

### Debug Mode
Enable debug logging by setting:
```env
NEXT_PUBLIC_APP_ENV=development
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Coinbase** for MiniKit and Base ecosystem
- **OpenRouter** for AI API access
- **Vercel** for hosting and deployment
- **Tailwind CSS** for styling framework
- **Lucide** for icon library

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the documentation

---

**Made with ❤️ for better sleep and wellness** - Base Mini App

A sleep tracker and analyzer app that uses pre/post sleep journaling and AI coaching to improve sleep quality for busy professionals.

## Features

- **Automated Sleep Tracking**: Track sleep duration and quality
- **Pre/Post Sleep Journaling**: Log daily habits and feelings
- **AI-Driven Sleep Coaching**: Get personalized recommendations
- **Mindfulness Tools**: Access guided meditations and relaxation exercises
- **Base Mini App Integration**: Seamless experience within Base App

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Required for Base Mini App functionality
   - `NEXT_PUBLIC_OPENROUTER_API_KEY`: For AI insights (or use OpenAI key)

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Base Integration**: MiniKit & OnchainKit
- **AI**: OpenAI/OpenRouter for sleep coaching
- **Charts**: Recharts for sleep data visualization
- **Icons**: Lucide React

## Project Structure

```
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── AppShell.tsx    # Main app layout
│   ├── SleepTracker.tsx # Sleep tracking interface
│   └── ...
├── lib/                # Utilities and services
│   ├── ai-service.ts   # AI coaching integration
│   ├── types.ts        # TypeScript definitions
│   └── utils.ts        # Helper functions
└── public/             # Static assets
```

## Key Components

- **SleepTracker**: Main interface for starting/stopping sleep sessions
- **JournalEntryForm**: Pre/post sleep journaling interface
- **CoachingInsightCard**: Display AI-generated sleep recommendations
- **SleepStats**: Overview of sleep metrics
- **SleepChart**: Visual representation of sleep quality trends

## Base Mini App Features

- Integrated with Base ecosystem via MiniKit
- Optimized for mobile-first experience
- Social features through Farcaster integration
- Wallet connectivity for future tokenization

## Development

The app follows Next.js 15 best practices with:
- TypeScript for type safety
- Tailwind CSS for styling
- Component-based architecture
- Proper error handling and loading states

## License

MIT License - see LICENSE file for details
