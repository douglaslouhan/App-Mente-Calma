import React from 'react';
import { Tab } from '../types';
import { RobotIcon, BookIcon, HeartIcon, CheckSquareIcon, UsersIcon } from './Icons';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const NavItem: React.FC<{
  label: Tab;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/5 pt-2 pb-1 transition-all duration-300 ${isActive ? 'text-[#4A2C6B]' : 'text-gray-400'}`}
    aria-label={label}
    aria-current={isActive ? 'page' : undefined}
  >
    {icon}
    <span className={`text-xs mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { label: Tab; icon: React.ReactNode }[] = [
    { label: 'Rilane', icon: <RobotIcon /> },
    { label: 'Guias', icon: <BookIcon /> },
    { label: 'Diário', icon: <HeartIcon /> },
    { label: 'Tarefas', icon: <CheckSquareIcon /> },
    { label: 'Comunidade', icon: <UsersIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around border-t border-gray-200">
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          isActive={activeTab === item.label}
          onClick={() => setActiveTab(item.label)}
        />
      ))}
    </nav>
  );
};

export default BottomNav;
