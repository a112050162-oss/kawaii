
import React, { useState, useEffect } from 'react';
import { FOOD_ITEMS } from '../constants';

interface SlotMachineProps {
  isSpinning: boolean;
  onFinish: (result: string) => void;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ isSpinning, onFinish }) => {
  const [reels, setReels] = useState(['🐰', '🎀', '🐰']);
  const [spinningReels, setSpinningReels] = useState([false, false, false]);
  const [lockedReels, setLockedReels] = useState([false, false, false]);
  const [finalResult, setFinalResult] = useState<string | null>(null);

  useEffect(() => {
    if (isSpinning) {
      setFinalResult(null);
      setSpinningReels([true, true, true]);
      setLockedReels([false, false, false]);
      
      const choice = FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)];
      
      const t1 = setTimeout(() => {
        setSpinningReels(prev => [false, prev[1], prev[2]]);
        setLockedReels(prev => [true, prev[1], prev[2]]);
        setReels(prev => [choice, prev[1], prev[2]]);
      }, 1200);

      const t2 = setTimeout(() => {
        setSpinningReels(prev => [false, false, prev[2]]);
        setLockedReels(prev => [true, true, prev[2]]);
        setReels(prev => [choice, choice, prev[2]]);
      }, 2000);

      const t3 = setTimeout(() => {
        setSpinningReels([false, false, false]);
        setLockedReels([true, true, true]);
        setReels([choice, choice, choice]);
        setFinalResult(choice);
        onFinish(choice);
      }, 2800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isSpinning, onFinish]);

  useEffect(() => {
    if (!isSpinning) return;
    const interval = setInterval(() => {
      setReels(prev => prev.map((val, idx) => 
        spinningReels[idx] ? FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)] : val
      ));
    }, 70);
    return () => clearInterval(interval);
  }, [isSpinning, spinningReels]);

  return (
    <div className="flex flex-col items-center gap-6 py-2 relative z-10 w-full">
      {/* Kawaii Ribbon Frame */}
      <div className="relative p-4 bg-[#ffdae9] rounded-[3rem] border-4 border-white shadow-[0_8px_0_#f472b6]">
        {/* Ribbon Decors */}
        <div className="absolute -top-6 -left-6 text-5xl animate-bounce">🎀</div>
        <div className="absolute -top-6 -right-6 text-5xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎀</div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-3xl">🎀</div>

        <div className="flex gap-4 p-4 bg-white/80 rounded-[2rem] border-4 border-dashed border-[#ffb3d1]">
          {reels.map((food, i) => (
            <div 
              key={i}
              className={`
                w-24 h-36 bg-gradient-to-b from-white to-[#fff0f6] rounded-2xl flex items-center justify-center text-5xl shadow-md border-4 relative overflow-hidden transition-all duration-300
                ${spinningReels[i] ? 'border-[#ffb3d1] reel-spin' : 'border-[#ffd1e3]'}
                ${lockedReels[i] && !spinningReels[i] ? 'jelly-bounce border-[#ff85b3]' : ''}
              `}
            >
              <div className="relative z-10 drop-shadow-[0_2px_2px_rgba(255,182,193,0.5)]">{food}</div>
              
              {/* Sparkle burst on lock */}
              {lockedReels[i] && !spinningReels[i] && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="absolute inset-0 bg-white/40 animate-pulse"></div>
                  <span className="text-xl animate-ping absolute">💖</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Cute Love Letter Result */}
      <div className={`transition-all duration-700 transform ${finalResult ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-75 pointer-events-none'}`}>
        <div className="bg-[#fff0f6] border-4 border-[#ff85b3] p-4 rounded-xl shadow-lg flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-1 opacity-20">💮</div>
          <span className="pixel-font text-[8px] text-[#ff85b3] mb-2 uppercase">Today's Sweet Treat</span>
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-spin-slow">⭐</span>
            <span className="pixel-font text-pink-500 text-2xl drop-shadow-sm">{finalResult}</span>
            <span className="text-2xl animate-spin-slow">⭐</span>
          </div>
          <div className="mt-2 text-[10px] pixel-font text-[#ffb3d1] animate-pulse">It's gonna be delicious!</div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SlotMachine;
