import React, { useState, memo } from 'react';
import HomeScreen from './HomeScreen';
import TicTacToe from './apps/TicTacToe';
import Chess from './apps/Chess';
import PlaceholderApp from './apps/PlaceholderApp';
import { AppType } from '../types';

const Phone: React.FC = () => {
  const [activeApp, setActiveApp] = useState<AppType>(AppType.HomeScreen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // When an app is opened from the home screen, ensure the menu is visually closed.
  const openApp = (app: AppType) => {
    setActiveApp(app);
    setIsMenuOpen(false);
  };

  const goHome = () => {
    setActiveApp(AppType.HomeScreen);
  };

  const renderActiveApp = () => {
    switch (activeApp) {
      case AppType.TicTacToe:
        return <TicTacToe onExit={goHome} />;
      case AppType.Chatbot:
        return <PlaceholderApp appName="Chatbot" onExit={goHome} />;
      case AppType.Chess:
        return <Chess onExit={goHome} />;
      case AppType.HomeScreen:
      default:
        // Pass the state setter to the home screen so it can report its menu status
        return <HomeScreen openApp={openApp} onMenuToggle={setIsMenuOpen} />;
    }
  };

  // The wallpaper should be blurred if an app is open, OR if the home screen menu is open.
  const shouldBlur = activeApp !== AppType.HomeScreen || isMenuOpen;

  return (
    <div className="w-[380px] h-[820px] bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-[60px] p-2 shadow-2xl shadow-black/50 border-2 border-neutral-700 transform-gpu transition-transform will-change-transform">
      <div className="w-full h-full bg-black rounded-[52px] overflow-hidden relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-black rounded-b-2xl z-20 flex justify-center items-center">
          <div className="w-16 h-2 bg-neutral-800 rounded-full"></div>
        </div>

        {/* Screen Content */}
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/wallpaper.jpg)' }}
        >
          <div className={`w-full h-full bg-black/50 transition-all duration-300 ${shouldBlur ? 'backdrop-blur-sm' : 'backdrop-blur-none'}`}>
            {renderActiveApp()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Phone);
