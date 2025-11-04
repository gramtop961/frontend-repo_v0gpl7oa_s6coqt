import React from 'react';
import { Home, MessageSquare, Settings } from 'lucide-react';

export default function Navbar({ current, onNavigate }) {
  const link = (key, label, Icon) => (
    <button
      key={key}
      onClick={() => onNavigate(key)}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        current === key ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
      }`}
      aria-current={current === key ? 'page' : undefined}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
          <span className="font-semibold tracking-tight">Vibe Companion</span>
        </div>
        <nav className="flex items-center gap-2">
          {link('home', 'Home', Home)}
          {link('chat', 'Chat', MessageSquare)}
          {link('settings', 'Settings', Settings)}
        </nav>
      </div>
    </header>
  );
}
