import React, { useState, useEffect } from 'react';
import { AppType } from '../types';
import AppIcon from './AppIcon';
import Clock from './Clock';
import SvgIcon from './SvgIcon';

// Import all the SVG icons as variables
import instagramIcon from './assets/instagram.svg';
import githubIcon from './assets/github.svg';
import linkedinIcon from './assets/linkedin.svg';
import leetcodeIcon from './assets/leetcode.svg';
import captionIcon from './assets/caption.svg';
import tictactoeIcon from './assets/ticktacktoe.svg'; // CORRECTED PATH
import chessIcon from './assets/chess.svg';         // CORRECTED PATH
import chatbotIcon from './assets/chatbot.svg';
import menuIcon from './assets/menu.svg';

interface HomeScreenProps {
  openApp: (app: AppType) => void;
  onMenuToggle: (isOpen: boolean) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ openApp, onMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    onMenuToggle(isMenuOpen);
  }, [isMenuOpen, onMenuToggle]);

  const apps = [
    { name: 'Instagram', icon: <SvgIcon src={instagramIcon} alt="Instagram"/>, href: 'https://www.instagram.com/its_ayushfr/' },
    { name: 'GitHub', icon: <SvgIcon src={githubIcon} alt="GitHub"/>, href: 'https://github.com/RaAyushJ' },
    { name: 'LinkedIn', icon: <SvgIcon src={linkedinIcon} alt="LinkedIn"/>, href: 'https://www.linkedin.com/in/ayush-raj-220ba1249/' },
    { name: 'LeetCode', icon: <SvgIcon src={leetcodeIcon} alt="LeetCode"/>, href: 'https://leetcode.com' },
    { name: 'Caption AI', icon: <SvgIcon src={captionIcon} alt="Caption AI"/>, href: 'https://ayush-instacaptionai.streamlit.app/' },
    { name: 'Tic-Tac-Toe', icon: <SvgIcon src={tictactoeIcon} alt="Tic-Tac-Toe"/>, action: () => openApp(AppType.TicTacToe) },
    { name: 'Chess Game', icon: <SvgIcon src={chessIcon} alt="Chess"/>, action: () => openApp(AppType.Chess) },
    { name: 'Chatbot', icon: <SvgIcon src={chatbotIcon} alt="Chatbot"/>, action: () => openApp(AppType.Chatbot) },
  ];

  return (
    // The main container for the home screen
    <div className="flex flex-col h-full p-4 text-white relative">
      
      {/* CLOCK: Added logic to hide when menu is open and adjusted top padding */}
      <div className={`pt-12 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
        <Clock />
      </div>

      {/* APP ICONS: This part slides in when the menu opens */}
      <div className={`transition-all duration-500 ease-in-out ${isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="flex-grow grid grid-cols-4 gap-y-6 gap-x-4 mt-8 content-start">
          {apps.map((app) => (
            <AppIcon key={app.name} name={app.name} action={app.action ? () => { app.action!(); setIsMenuOpen(false); } : undefined} href={app.href}>
              {app.icon}
            </AppIcon>
          ))}
        </div>
      </div>

      {/* BOTTOM DOCK / MENU BUTTON */}
      {/* BOTTOM DOCK / MENU BUTTON */}
      <div className="absolute bottom-6 left-1/2 -translate-x-[30%]">
        <div className="flex justify-center items-center bg-black/20 backdrop-blur-lg rounded-full p-2 h-[80px]">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-16 h-16 bg-neutral-700/50 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none"
          >
          <img
            src={menuIcon}
            alt="Menu"
            className={`w-8 h-8 transition-all duration-500 ease-in-out ${isMenuOpen ? 'transform rotate-90 scale-110' : 'rotate-0'}`}
            style={{
            filter:
              'invert(80%) sepia(20%) saturate(5000%) hue-rotate(350deg) brightness(105%) contrast(101%)',
            }}
          />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;