"use client";
import { useEffect, useState } from "react";
import emotionData from "../data/emotions.json";

type EmotionType = "happy" | "sad" | "angry" | "neutral";

type EmotionEntry = {
  timestamp: string;
  emotion: EmotionType;
  confidence: number;
};

type SummaryType = Record<EmotionType, number>;

const EmotionSummary = () => {
  const [summary, setSummary] = useState<SummaryType>({
    happy: 0,
    sad: 0,
    angry: 0,
    neutral: 0
  });
  const [danger, setDanger] = useState(false);

  useEffect(() => {
    const counts: SummaryType = {
      happy: 0,
      sad: 0,
      angry: 0,
      neutral: 0
    };

    (emotionData as EmotionEntry[]).forEach((entry) => {
      if (counts[entry.emotion] !== undefined) {
        counts[entry.emotion]++;
      }
    });

    const dangerZone = counts.sad + counts.angry >= 4;

    setSummary(counts);
    setDanger(dangerZone);
  }, []);

  return (
    <div className="mt-8 p-6 rounded-lg bg-gray-100 shadow-md w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">📊 Emotion Summary (This Week)</h3>
      <ul className="space-y-2">
        <li>😃 Happy: {summary.happy}</li>
        <li>😢 Sad: {summary.sad}</li>
        <li>😠 Angry: {summary.angry}</li>
        <li>😐 Neutral: {summary.neutral}</li>
      </ul>
      <div className="mt-4 text-lg font-bold">
        {danger ? (
          <span className="text-red-600">🔴 Danger Zone: Yes</span>
        ) : (
          <span className="text-green-600">🟢 Danger Zone: No</span>
        )}
      </div>
    </div>
  );
};

export default EmotionSummary;
