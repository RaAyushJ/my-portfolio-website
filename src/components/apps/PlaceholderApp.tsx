import React from 'react';

interface PlaceholderAppProps {
  appName: string;
  onExit: () => void;
}

const PlaceholderApp: React.FC<PlaceholderAppProps> = ({ appName, onExit }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 backdrop-blur-md bg-black/50 text-white">
      <div className="absolute top-4 left-4">
        <button onClick={onExit} className="px-3 py-1 rounded-md bg-orange-600/80 hover:bg-orange-500/80 transition-colors text-sm">
          &lt; Home
        </button>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-orange-400">{appName}</h2>
        <p className="mt-2 text-lg opacity-70">Coming Soon!</p>
        <p className="mt-4 max-w-xs text-sm opacity-50">
          This feature is currently under development. Check back later for updates!
        </p>
      </div>
    </div>
  );
};

export default PlaceholderApp;