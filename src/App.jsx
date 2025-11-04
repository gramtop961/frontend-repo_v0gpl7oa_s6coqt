import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import SettingsPage from './components/SettingsPage';

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}

export default function App() {
  const [route, setRoute] = useState('home');
  const [started, setStarted] = useState(false);
  const [gender, setGender] = useState('any');
  const [figureId, setFigureId] = useState(null);
  const [name, setName] = useState('');
  const [useMemory, setUseMemory] = useState(true);
  const [traits, setTraits] = useState({
    calmEnergetic: 50,
    seriousPlayful: 50,
    supportiveChallenging: 50,
    logicalEmotional: 50,
    harshness: 2,
  });
  const [settings, setSettings] = useState({
    teasing: 'Mild',
    crush: 'Off',
    romance: 'None',
    boundaries: 'Balanced',
    swearing: 'Mild',
  });

  const [chats, setChats] = useLocalStorage('vibe_chats', []);

  const canChat = useMemo(() => !!figureId && (name?.trim()?.length || 0) > 0, [figureId, name]);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '') || 'home';
      setRoute(hash);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const navigate = (key) => {
    window.location.hash = `/${key}`;
    setRoute(key);
  };

  const openChat = (chat) => {
    setFigureId(chat.figureId || null);
    setName(chat.name || '');
    setStarted(true);
    navigate('chat');
  };

  const createChat = () => {
    if (!canChat) return;
    const newChat = {
      id: `chat_${Date.now()}`,
      name,
      figureId,
      updatedAt: Date.now(),
      lastMessage: '',
      useMemory,
      traits,
      settings,
    };
    setChats((prev) => [newChat, ...prev]);
    setStarted(true);
    navigate('chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <Navbar current={route} onNavigate={navigate} />

      <main className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-8">
        {route === 'home' && (
          <HomePage
            onStart={createChat}
            gender={gender}
            setGender={setGender}
            figureId={figureId}
            setFigureId={setFigureId}
            name={name}
            setName={setName}
            useMemory={useMemory}
            setUseMemory={setUseMemory}
            traits={traits}
            setTraits={setTraits}
            chats={chats}
            onOpenChat={openChat}
          />
        )}

        {route === 'chat' && (
          <ChatPage
            active={started && canChat}
            figureId={figureId}
            name={name || 'Companion'}
            settings={settings}
            traits={traits}
            canChat={canChat}
            useMemory={useMemory}
          />
        )}

        {route === 'settings' && (
          <SettingsPage settings={settings} setSettings={setSettings} />
        )}
      </main>
    </div>
  );
}
