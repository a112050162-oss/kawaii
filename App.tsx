
import React, { useState, useCallback } from 'react';
import Notepad from './components/Notepad';
import SlotMachine from './components/SlotMachine';
import DanmakuContainer from './components/DanmakuContainer';

const App: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleStart = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
  };

  const handleFinish = useCallback((finalFood: string) => {
    setSpinning(false);
    setResult(finalFood);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Super Cute Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <div 
            key={i} 
            className="absolute opacity-40 animate-[fall_10s_linear_infinite]"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `-60px`, 
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${Math.random() * 20 + 20}px`,
              filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))'
            }}
          >
            {['🧸', '🐰', '🍭', '💖', '🎀', '🍓'][i % 6]}
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col items-center gap-8 relative z-10 max-w-3xl">
        <Notepad title="StrawberryMilk_Menu.exe - Kawaii Edition">
          <div className="relative min-h-[420px] flex flex-col items-center justify-center lace-border bg-[#fffafa] p-6">
            <DanmakuContainer />
            
            <div className="z-10 text-center mb-4">
              <div className="flex justify-center gap-1 text-2xl mb-1">
                <span>🍬</span><span>🍓</span><span>🍬</span>
              </div>
              <h1 className="pixel-font text-[#ff66a3] text-xl drop-shadow-[2px_2px_0px_white]">
                LUCKY LUNCH BOX
              </h1>
              <p className="pixel-font text-[8px] text-[#ffb3d1] mt-2 tracking-widest">SELECTING SOMETHING YUMMY!</p>
            </div>

            <SlotMachine isSpinning={spinning} onFinish={handleFinish} />

            {/* Upright Heart Start Button */}
            <div className="mt-10 z-20">
              <button 
                onClick={handleStart}
                disabled={spinning}
                className={`
                  relative group w-32 h-32 flex items-center justify-center transition-all
                  ${spinning ? 'opacity-70 scale-95' : 'hover:scale-110 active:scale-90 cursor-pointer'}
                `}
              >
                {/* Perfect Upright Heart SVG with Shadow */}
                <div className={`absolute inset-0 transition-transform ${spinning ? 'animate-pulse' : ''}`}>
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-full h-full fill-[#ff85b3] filter drop-shadow-[0_8px_0_#db2777]"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                
                <span className="pixel-font text-white text-[12px] relative z-10 drop-shadow-[1px_1px_0px_#db2777] mb-2">
                  {spinning ? 'SPIN!' : 'PUSH'}
                </span>
                
                {/* Sparkles around button */}
                <span className="absolute -top-2 -left-2 text-2xl animate-pulse">✨</span>
                <span className="absolute -bottom-2 -right-2 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</span>
              </button>
            </div>
          </div>
        </Notepad>

        {/* Kawaii Status Bar */}
        <div className="w-full space-y-4">
          <div className="bg-white/70 border-4 border-[#ffdeeb] p-3 rounded-2xl flex justify-between items-center pixel-font text-[9px] text-[#ff66a3] shadow-sm">
             <div className="flex items-center gap-2">
               <span className="animate-bounce">🍬</span>
               <span>HAPPINESS: MAX</span>
             </div>
             <div className="flex items-center gap-3">
               <span className="bg-pink-100 px-2 py-1 rounded-full border border-pink-200">kawaii_mode_v2.0</span>
             </div>
          </div>

          <div className="bg-[#ffdeeb] p-1 retro-border flex items-center h-10 px-2 gap-2 rounded-md">
            <button className="h-full bg-white px-3 border-2 border-pink-200 flex items-center gap-2 rounded-sm active:shadow-inner">
              <span className="text-lg">🍥</span>
              <span className="pixel-font text-[9px] pt-1 text-pink-400">Yum!</span>
            </button>
            <div className="flex-1 h-full bg-white/40 px-3 flex items-center border border-pink-200 rounded-sm">
              <marquee className="pixel-font text-[9px] text-pink-400">
                Bunny cakes, strawberry shakes, and lucky slots! 🐰✨ What will the princess eat today? 🍓💖✨
              </marquee>
            </div>
            <div className="h-full bg-pink-100 px-3 flex items-center pixel-font text-[9px] text-pink-500 rounded-sm">
              🎀 12:34
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default App;
