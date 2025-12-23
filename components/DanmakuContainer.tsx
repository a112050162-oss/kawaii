
import React, { useMemo } from 'react';
import { DANMAKU_PHRASES } from '../constants';

const DanmakuContainer: React.FC = () => {
  const messages = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      text: DANMAKU_PHRASES[Math.floor(Math.random() * DANMAKU_PHRASES.length)],
      top: 10 + Math.random() * 80,
      duration: 8 + Math.random() * 15,
      delay: Math.random() * 5,
      color: i % 2 === 0 ? 'text-pink-400' : 'text-purple-400',
      size: 14 + Math.random() * 10
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 z-0 overflow-hidden">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`danmaku-text ${m.color} font-bold`}
          style={{
            top: `${m.top}%`,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
            fontSize: `${m.size}px`
          }}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
};

export default DanmakuContainer;
