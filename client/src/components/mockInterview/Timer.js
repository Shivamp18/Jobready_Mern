
import { useState, useEffect } from 'react';

export default function Timer({ start }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!start) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60}`.padStart(2, '0');

  return <div className="text-xl font-bold">Time: {formatTime(seconds)}</div>;
}
