'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface SleepChartProps {
  data: Array<{
    day: string;
    quality: number;
    duration: number;
  }>;
}

export function SleepChart({ data }: SleepChartProps) {
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(0 0% 70%)', fontSize: 12 }}
          />
          <YAxis hide />
          <Bar 
            dataKey="quality" 
            fill="hsl(220 96% 55%)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
