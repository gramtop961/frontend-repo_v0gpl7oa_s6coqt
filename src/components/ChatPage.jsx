import React from 'react';
import ChatInterface from './ChatInterface';

export default function ChatPage({ active, figureId, name, settings, traits, canChat, useMemory }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Chat</h2>
            <p className="text-sm text-gray-600">{name ? `${name}` : 'Companion'} • {figureId || 'No figure selected'}</p>
          </div>
          <div className="text-xs text-gray-500">Memory: {useMemory ? 'enabled' : 'off'}</div>
        </div>
      </div>

      <ChatInterface
        active={active}
        figureId={figureId}
        name={name || 'Companion'}
        settings={settings}
        traits={traits}
      />

      {!canChat && (
        <div className="text-center text-sm text-gray-600">
          Pick a gender, choose a figure, and give your companion a name on the Home page before chatting.
        </div>
      )}
    </div>
  );
}
