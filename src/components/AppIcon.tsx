import React from 'react';

interface AppIconProps {
  name: string;
  children: React.ReactNode;
  action?: () => void;
  href?: string;
}

const AppIcon: React.FC<AppIconProps> = ({ name, children, action, href }) => {
  const commonProps = {
    className: 'flex flex-col items-center justify-center text-center cursor-pointer group',
  };

  const content = (
    <>
      <div className="w-16 h-16 bg-neutral-800/50 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-lg transform transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-2xl [transform-style:preserve-3d]">
        {children}
      </div>
      <span className="text-xs mt-2 text-white/90 truncate w-full px-1">{name}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={action} {...commonProps}>
      {content}
    </button>
  );
};

export default AppIcon;