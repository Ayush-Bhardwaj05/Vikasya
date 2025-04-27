"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
  } from "recharts";
  
  type EmotionType = "happy" | "sad" | "angry" | "neutral" | string;
  
  type EmotionEntry = {
    emotion: EmotionType;
    timestamp: string;
    confidence: number;
  };
  
  type Props = {
    emotions: EmotionEntry[];
  };
  
  export const EmotionStats = ({ emotions }: Props) => {
    const emotionCounts: Record<EmotionType, number> = {};
    const dailySadAngryCounts: Record<string, number> = {};
  
    emotions.forEach((entry) => {
      const emotion = entry.emotion;
      const date = new Date(entry.timestamp).toDateString();
  
      if (!emotionCounts[emotion]) emotionCounts[emotion] = 0;
      emotionCounts[emotion] += 1;
  
      if ((emotion === "sad" || emotion === "angry") && entry.confidence > 0.8) {
        if (!dailySadAngryCounts[date]) dailySadAngryCounts[date] = 0;
        dailySadAngryCounts[date] += 1;
      }
    });
  
    const dangerDays = Object.values(dailySadAngryCounts).filter((count) => count >= 3);
  
    const chartData = Object.keys(emotionCounts).map((emotion) => ({
      emotion,
      count: emotionCounts[emotion]
    }));
  
    return (
      <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-lg mt-4">
        <h2 className="text-lg font-bold mb-2">Weekly Emotion Overview</h2>
  
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="emotion" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" radius={8} />
          </BarChart>
        </ResponsiveContainer>
  
        {dangerDays.length > 0 ? (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
            ⚠️ Alert: Emotional stress detected on {dangerDays.length} day(s). Consider reaching out for support.
          </div>
        ) : (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md">
            ✅ All good! No emotional danger zones detected this week.
          </div>
        )}
      </div>
    );
  };
  