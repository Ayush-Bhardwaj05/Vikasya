import emotions from "../data/emotions.json";
import "./heatmap.css";
import Emotion from "./Dashboard";
type EmotionType = "happy" | "sad" | "angry" | "neutral" | "anxious" | "calm";

type EmotionEntry = {
  timestamp: string;
  emotion: EmotionType;
  confidence: number;
};
type HeatMapProps = {
    emotions: EmotionType[];
  };

const getDayName = (date: Date): string =>
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];

const getTimeSlot = (date: Date): string => {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Morning";
  if (hour >= 12 && hour < 17) return "Afternoon";
  if (hour >= 17 && hour < 21) return "Evening";
  return "Night";
};

const emotionColors: Record<EmotionType, string> = {
  happy: "#ffe066",
  sad: "#74c0fc",
  angry: "#ff6b6b",
  neutral: "#ced4da",
  anxious: "#b197fc",
  calm: "#8ce99a",
};

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const timeslots = ["Morning", "Afternoon", "Evening", "Night"];

const HeatMap = ({ emotions }: HeatMapProps) => {
  const emotionMap: Record<string, Record<string, EmotionType>> = {};

  (emotions as EmotionEntry[]).forEach((entry) => {
    const date = new Date(entry.timestamp);
    const day = getDayName(date);
    const timeSlot = getTimeSlot(date);
    const emotion = entry.emotion;

    if (!emotionMap[day]) emotionMap[day] = {};
    emotionMap[day][timeSlot] = emotion;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-xl font-bold mb-4">Weekly Emotion Heatmap</h2>
      <div className="grid" style={{ display: "grid", gridTemplateColumns: "120px repeat(7, 1fr)", gap: "1px" }}>
        <div></div>
        {weekdays.map((day) => (
          <div key={day} className="font-semibold text-center">{day}</div>
        ))}

        {timeslots.map((slot) => (
          <>
            <div key={slot} className="font-semibold">{slot}</div>
            {weekdays.map((day) => {
              const emotion = emotionMap[day]?.[slot];
              const bg = emotion ? emotionColors[emotion] : "#f1f3f5";
              return (
                <div
                  key={`${day}-${slot}`}
                  style={{
                    backgroundColor: bg,
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #dee2e6",
                    fontWeight: 500,
                    color: "#212529",
                  }}
                >
                  {emotion || ""}
                </div>
              );
            })}
          </>
        ))}
      </div>
    </div>
  );
};

export default HeatMap;
