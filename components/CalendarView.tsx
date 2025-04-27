"use client";

import { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import './calender.css';

type EmotionType = 'happy' | 'sad' | 'angry' | 'neutral';

type EmotionEntry = {
  timestamp: string;
  emotion: EmotionType;
};

const emotionColors: Record<EmotionType, string> = {
  happy: '#A7F3D0',
  sad: '#BFDBFE',
  angry: '#FCA5A5',
  neutral: '#D1D5DB',
};

const CalendarView = () => {
  const [emotionsData, setEmotionsData] = useState<EmotionEntry[]>([]);

  useEffect(() => {
    fetch('/emotions.json')
      .then((res) => res.json())
      .then((data: EmotionEntry[]) => setEmotionsData(data));
  }, []);

  const today = new Date();
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  const emotionByDate: Record<string, EmotionType> = {};
  emotionsData.forEach((entry) => {
    const dateKey = format(new Date(entry.timestamp), 'yyyy-MM-dd');
    emotionByDate[dateKey] = entry.emotion;
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Emotion Calendar</h2>
      <div className="calendar-container">
        {daysInMonth.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const emotion = emotionByDate[dateKey] || 'neutral';
          return (
            <div
              key={dateKey}
              className="calendar-day"
              style={{ backgroundColor: emotionColors[emotion] }}
              title={`${dateKey}: ${emotion}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
