import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export async function generateSleepInsight(
  sleepData: {
    duration: number;
    quality: number;
    preNotes: string;
    postNotes: string;
    activities: string[];
  }
): Promise<string> {
  try {
    const prompt = `
    As a sleep coach AI, analyze this sleep data and provide personalized advice:
    
    Sleep Duration: ${sleepData.duration} minutes
    Sleep Quality Score: ${sleepData.quality}/100
    Pre-sleep notes: ${sleepData.preNotes}
    Post-sleep notes: ${sleepData.postNotes}
    Activities: ${sleepData.activities.join(', ')}
    
    Provide 2-3 specific, actionable recommendations to improve sleep quality. 
    Keep it concise and encouraging. Focus on the most impactful changes.
    `;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful sleep coach AI that provides personalized, actionable advice for better sleep.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'Focus on maintaining consistent sleep schedule and creating a relaxing bedtime routine.';
  } catch (error) {
    console.error('Error generating sleep insight:', error);
    return 'Focus on maintaining consistent sleep schedule and creating a relaxing bedtime routine.';
  }
}
