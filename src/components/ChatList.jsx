import React from 'react';
import { MessageSquarePlus, MessageSquare, Clock } from 'lucide-react';

function formatTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return '';
  }
}

export default function ChatList({ chats, onOpenChat, onStartNew }) {
  const hasChats = (chats?.length || 0) > 0;

  return (
    <section className="w-full rounded-2xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold">Ongoing chats</h2>
        </div>
        <button
          onClick={onStartNew}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black active:scale-[0.98]"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Start new chat
        </button>
      </div>

      {hasChats ? (
        <ul className="divide-y divide-gray-200">
          {chats.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => onOpenChat(c)}
                className="w-full text-left px-4 md:px-5 py-4 hover:bg-gray-50 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium text-gray-900">{c.name || 'Companion'}</div>
                  <div className="text-sm text-gray-600">{c.figureId || 'No figure'}{c.lastMessage ? ` • ${c.lastMessage.slice(0, 60)}${c.lastMessage.length > 60 ? '…' : ''}` : ''}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(c.updatedAt)}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-6 text-center text-sm text-gray-600">
          No chats yet. Click “Start new chat” to create your first conversation.
        </div>
      )}
    </section>
  );
}
