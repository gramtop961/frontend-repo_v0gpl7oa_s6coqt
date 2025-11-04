import React, { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D';
import FigureSelector from './components/FigureSelector';
import SettingsPanel from './components/SettingsPanel';
import ChatInterface from './components/ChatInterface';

export default function App() {
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

  const canChat = useMemo(() => !!figureId && (name?.trim()?.length || 0) > 0, [figureId, name]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10 space-y-8">
        <Hero3D onGetStarted={() => setStarted(true)} />

        <div className="grid gap-6 md:grid-cols-2">
          <FigureSelector
            gender={gender}
            setGender={setGender}
            figureId={figureId}
            setFigureId={setFigureId}
            traits={traits}
            setTraits={setTraits}
            name={name}
            setName={setName}
            useMemory={useMemory}
            setUseMemory={setUseMemory}
          />

          <SettingsPanel settings={settings} setSettings={setSettings} />
        </div>

        <ChatInterface
          active={started && canChat}
          figureId={figureId}
          name={name || 'Companion'}
          settings={settings}
          traits={traits}
        />

        {!canChat && (
          <div className="text-center text-sm text-gray-600">
            Pick a gender, choose a figure, and give your companion a name to start chatting.
          </div>
        )}

        {useMemory ? (
          <div className="text-center text-xs text-gray-500">
            Memory: enabled — your companion will remember preferences across sessions.
          </div>
        ) : (
          <div className="text-center text-xs text-gray-500">
            Memory: off — this chat treats you as a new friend.
          </div>
        )}
      </div>
    </div>
  );
}
