"use client";
import emotionData from "../data/emotions.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

type EmotionType = "happy" | "sad" | "angry" | "neutral";

type EmotionEntry = {
  timestamp: string;
  emotion: EmotionType;
};

type LineChartData = {
  date: string;
  happy: number;
  sad: number;
  angry: number;
  neutral: number;
};

const COLORS = ["#4ade80", "#f87171", "#facc15", "#a1a1aa"];

const EmotionGraphs = () => {
  const lineDataMap: Record<string, LineChartData> = {};

  (emotionData as EmotionEntry[]).forEach((entry) => {
    const date = new Date(entry.timestamp).toLocaleDateString("en-IN");
    if (!lineDataMap[date]) {
      lineDataMap[date] = { date, happy: 0, sad: 0, angry: 0, neutral: 0 };
    }
    lineDataMap[date][entry.emotion]++;
  });

  const lineData = Object.values(lineDataMap);

  const emotionCount: Record<EmotionType, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    neutral: 0,
  };

  (emotionData as EmotionEntry[]).forEach((e) => {
    emotionCount[e.emotion]++;
  });

  const pieData = Object.keys(emotionCount).map((key) => ({
    name: key,
    value: emotionCount[key as EmotionType],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
      <div className="w-full h-80 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">📈 Weekly Emotion Trend</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="happy" stroke="#4ade80" />
            <Line type="monotone" dataKey="sad" stroke="#f87171" />
            <Line type="monotone" dataKey="angry" stroke="#facc15" />
            <Line type="monotone" dataKey="neutral" stroke="#a1a1aa" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full h-80 bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">📊 Emotion Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmotionGraphs;
