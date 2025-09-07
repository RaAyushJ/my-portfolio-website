import React, { useState, useEffect } from 'react';
import { AppType } from '../types';
import AppIcon from './AppIcon';
import Clock from './Clock';
import SvgIcon from './SvgIcon';

interface HomeScreenProps {
  openApp: (app: AppType) => void;
  onMenuToggle: (isOpen: boolean) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ openApp, onMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Inform the parent component (Phone.tsx) about the menu state change.
  useEffect(() => {
    onMenuToggle(isMenuOpen);
  }, [isMenuOpen, onMenuToggle]);

  const apps = [
    { name: 'Instagram', icon: <SvgIcon src="/components/assets/instagram.svg" alt="Instagram"/>, href: 'https://www.instagram.com/its_ayushfr/' },
    { name: 'GitHub', icon: <SvgIcon src="/components/assets/github.svg" alt="GitHub"/>, href: 'https://github.com/RaAyushJ' },
    { name: 'LinkedIn', icon: <SvgIcon src="/components/assets/linkedin.svg" alt="LinkedIn"/>, href: 'https://www.linkedin.com/in/ayush-raj-220ba1249/' },
    { name: 'LeetCode', icon: <SvgIcon src="/components/assets/leetcode.svg" alt="LeetCode"/>, href: 'https://leetcode.com' },
    { name: 'Caption AI', icon: <SvgIcon src="/components/assets/caption.svg" alt="Caption AI"/>, href: 'https://ayush-instacaptionai.streamlit.app/' },
    { name: 'Tic-Tac-Toe', icon: <SvgIcon src="/components/assets/ticktacktoe.svg" alt="Tic-Tac-Toe"/>, action: () => openApp(AppType.TicTacToe) },
    { name: 'Chess Game', icon: <SvgIcon src="/components/assets/chess.svg" alt="Chess"/>, action: () => openApp(AppType.Chess) },
    { name: 'Chatbot', icon: <SvgIcon src="/components/assets/chatbot.svg" alt="Chatbot"/>, action: () => openApp(AppType.Chatbot) },
  ];

  return (
    <div className="flex flex-col h-full p-6 pt-16 text-white relative">
      <Clock />

      <div className={`transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="flex-grow grid grid-cols-4 gap-4 mt-8 content-start">
          {apps.map((app) => (
            <AppIcon key={app.name} name={app.name} action={app.action ? () => { app.action!(); setIsMenuOpen(false); } : undefined} href={app.href}>
              {app.icon}
            </AppIcon>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full px-8">
        <div className="flex justify-center items-center gap-4 bg-black/20 backdrop-blur-lg rounded-full p-2">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-16 h-16 bg-neutral-700/50 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                <img
                    src="/components/assets/menu.svg"
                    alt="Menu"
                    className={`w-8 h-8 transition-all duration-300 ease-in-out ${isMenuOpen ? 'transform rotate-90' : ''}`}
                    style={{
                        filter: 'invert(60%) sepia(98%) saturate(1433%) hue-rotate(359deg) brightness(101%) contrast(101%)'
                    }}
                />
            </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
