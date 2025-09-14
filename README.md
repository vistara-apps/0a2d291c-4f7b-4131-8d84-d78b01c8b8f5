# DreamWeaver AI - Base Mini App

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
