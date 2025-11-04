import React, { useState } from 'react';
import Hero3D from './Hero3D';
import FigureSelector from './FigureSelector';
import ChatList from './ChatList';

export default function HomePage({
  onStart,
  gender,
  setGender,
  figureId,
  setFigureId,
  name,
  setName,
  useMemory,
  setUseMemory,
  traits,
  setTraits,
  chats,
  onOpenChat,
}) {
  const [startingNew, setStartingNew] = useState(false);

  if (startingNew) {
    return (
      <div className="space-y-8">
        <Hero3D onGetStarted={() => onStart?.()} />

        <section className="grid gap-6 md:grid-cols-2">
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
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm h-full">
            <h3 className="text-lg font-semibold mb-2">How it works</h3>
            <p className="text-sm text-gray-600 mb-4">
              Choose your companion’s vibe and figure. Give them a name and decide if they should remember you across sessions. When ready, jump into the chat to start the conversation.
            </p>
            <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
              <li>Mentor guides you with firm but caring energy.</li>
              <li>Parent offers warm support and practical advice.</li>
              <li>Friend keeps it playful and real.</li>
              <li>Therapist stays neutral and reflective.</li>
            </ul>

            <div className="mt-6">
              <button
                onClick={() => setStartingNew(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Back to chats
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ChatList chats={chats} onOpenChat={onOpenChat} onStartNew={() => setStartingNew(true)} />
    </div>
  );
}
