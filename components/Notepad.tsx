
import React from 'react';

interface NotepadProps {
  children: React.ReactNode;
  title?: string;
}

const Notepad: React.FC<NotepadProps> = ({ children, title = "KawaiiMenu.exe" }) => {
  return (
    <div className="w-full max-w-2xl bg-[#ffdeeb] p-1.5 retro-border select-none rounded-lg">
      {/* Kawaii Title Bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#ff85b3] via-[#ffa3c5] to-[#ff85b3] px-3 py-1.5 mb-1 rounded-t-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍬</span>
          <span className="text-white text-[10px] pixel-font drop-shadow-sm">{title}</span>
        </div>
        <div className="flex gap-2">
          <WindowButton icon="♥" color="bg-pink-300" />
          <WindowButton icon="★" color="bg-yellow-200" />
          <WindowButton icon="🌙" color="bg-purple-300" />
        </div>
      </div>
      
      {/* Content Area */}
      <div className="bg-white p-4 h-full border-2 border-[#ffb3d1] relative overflow-hidden rounded-b-sm">
        {children}
      </div>
    </div>
  );
};

const WindowButton: React.FC<{ icon: string; color: string }> = ({ icon, color }) => (
  <button className={`w-5 h-5 flex items-center justify-center text-[10px] border-2 border-white rounded-full ${color} shadow-sm active:scale-90 transition-transform`}>
    {icon}
  </button>
);

export default Notepad;
