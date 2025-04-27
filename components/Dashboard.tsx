"use client";
import HeatMap from "./HeatMap";
import { EmotionStats } from "./EmotionStats";
import emotions from "../data/emotions.json";
import EmotionSummary from "./EmotionSummary";
import EmotionGraphs from "./EmotionGraphs";
import CalendarView from "./CalendarView";

type Emotion = {
  timestamp: string;
  emotion: "happy" | "sad" | "angry" | "neutral";
  confidence: number;
};

const Dashboard = () => {
  const typedEmotions: Emotion[] = emotions
    .filter((e) => ["happy", "sad", "angry", "neutral"].includes(e.emotion))
    .map((e) => ({
      timestamp: e.timestamp,
      emotion: e.emotion as "happy" | "sad" | "angry" | "neutral",
      confidence: e.confidence,
    }));

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Emotional Heatmap Dashboard</h1>
      <HeatMap emotions={typedEmotions} />
      <EmotionStats emotions={typedEmotions} />
      <EmotionSummary />
      <EmotionGraphs />
      <CalendarView />
    </div>
  );
};

export default Dashboard;
