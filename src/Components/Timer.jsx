import React, { useEffect, useState } from 'react';
import '../styles/timer.css';

const interpolateColor = (color1, color2, ratio) => {
  const hex = (c) => {
    const color = Math.min(Math.max(0, Math.round(c)), 255);
    return ('0' + color.toString(16)).slice(-2);
  };
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.floor(r1 * (1 - ratio) + r2 * ratio);
  const g = Math.floor(g1 * (1 - ratio) + g2 * ratio);
  const b = Math.floor(b1 * (1 - ratio) + b2 * ratio);
  return '#' + hex(r) + hex(g) + hex(b);
};

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  const percentage = (timeLeft / initialTime) * 100;

  // Colours for the timer
  const colors = [
    { percentage: 0, color: '#ff0000' },
    { percentage: 10, color: '#ff6347' },
    { percentage: 30, color: '#ffa500' }, 
    { percentage: 50, color: '#ffff00' }, 
    { percentage: 70, color: '#66ff00' }, 
    { percentage: 100, color: '#00ff00' },   
  ];

  let barColor = colors[0].color; 

  for (let i = 1; i < colors.length; i++) {
    if (percentage <= colors[i].percentage) {
      const prevColor = colors[i - 1];
      const nextColor = colors[i];
      const ratio = (percentage - prevColor.percentage) / (nextColor.percentage - prevColor.percentage);
      barColor = interpolateColor(prevColor.color, nextColor.color, ratio);
      break;
    }
  }

  return (
    <div className="timer-container">
      <div className="timer-bar-background">
        <div
          className="timer-bar-fill"
          style={{ width: `${percentage}%`, backgroundColor: barColor }}
        />
      </div>
      <p className="timer-text">{timeLeft}s</p>
    </div>
  );
};

export default Timer;