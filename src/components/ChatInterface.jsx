import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, LayoutGrid, Smartphone } from 'lucide-react';

function analyzeStyle(messages) {
  if (messages.length === 0) return 'balanced';
  const userMsgs = messages.filter(m => m.role === 'user');
  if (userMsgs.length < 3) return 'balanced';
  const avgLen = userMsgs.reduce((a,m)=>a+m.text.length,0)/userMsgs.length;
  const emojiCount = userMsgs.join?.length ? 0 : userMsgs.map(m => (m.text.match(/[\p{Emoji}]/gu)||[]).length).reduce((a,b)=>a+b,0);
  const emojiRate = emojiCount / Math.max(1, userMsgs.length);
  if (avgLen < 15 && emojiRate < 0.3) return 'dry';
  if (avgLen > 40 || emojiRate >= 0.6) return 'energetic';
  return 'balanced';
}

function companionReply({ text, baseline, figureId, settings, traits, name }) {
  const lower = text.toLowerCase();
  const playful = settings.teasing !== 'None' && (figureId?.includes('friend') || figureId==='brother' || figureId==='sister');
  const therapist = figureId === 'therapist';

  const greetNeeded = /(hi|hey|hello|yo)\b/.test(lower);
  let tone = '';
  if (therapist) tone = 'I hear you. I’m here and we can take it one step at a time.';
  else if (playful) tone = 'ngl you got this fr 🔥';
  else tone = 'I’m with you. Let’s figure this out together.';

  let stylePrefix = '';
  if (baseline === 'dry') stylePrefix = '';
  if (baseline === 'balanced') stylePrefix = '';
  if (baseline === 'energetic') stylePrefix = 'omg ';

  let reply = '';
  if (greetNeeded) {
    reply = `hey, I’m ${name}. what’s up?`;
  } else if (/sad|down|tired|alone|lonely/.test(lower)) {
    reply = therapist
      ? "that sounds heavy. let's slow down and breathe together. what happened?"
      : playful
        ? "dang that’s rough ngl 😭 wanna vent? I’m all ears"
        : "sorry you’re feeling like that. I’m here. want to tell me more?";
  } else if (/bus|late|missed/.test(lower)) {
    reply = playful ? "broooo u really out here inventing new ways to be late 💀" : "ah, that’s annoying. want help planning tomorrow?";
  } else {
    reply = tone;
  }

  // Mentor harshness
  const harsh = traits?.harshness || 1;
  if (figureId?.includes('mentor') && harsh >= 4) {
    reply += ' quick note: let’s tighten up the plan and move now.';
  } else if (figureId?.includes('mentor') && harsh <= 2) {
    reply += ' it’s okay to go steady; little wins add up.';
  }

  return (stylePrefix + reply).trim();
}

export default function ChatInterface({ active, figureId, name, settings, traits }) {
  const [layout, setLayout] = useState('standard'); // 'standard' | 'whatsapp'
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  const baseline = useMemo(()=> analyzeStyle(messages), [messages]);

  useEffect(()=>{
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, layout]);

  useEffect(()=>{
    if (!active) return;
    // intro when chat starts
    if (messages.length === 0) {
      const intro = figureId === 'therapist'
        ? `hi, I’m ${name}. I’ll keep things calm and focused. what name should I call you?`
        : `hey, I’m ${name} :) what should I call you? what do you do for fun?`;
      setMessages([{ role: 'ai', text: intro, ts: Date.now() }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const send = () => {
    if (!input.trim()) return;
    const user = { role: 'user', text: input.trim(), ts: Date.now() };
    const aiText = companionReply({ text: input.trim(), baseline, figureId, settings, traits, name });
    const ai = { role: 'ai', text: aiText, ts: Date.now() + 1 };
    setMessages(prev => [...prev, user, ai]);
    setInput('');
  };

  const bubbleClasses = (role) => {
    if (layout === 'whatsapp') {
      return role === 'user'
        ? 'bg-emerald-500 text-white rounded-2xl rounded-br-sm'
        : 'bg-white text-gray-900 rounded-2xl rounded-bl-sm border border-gray-200';
    }
    return role === 'user'
      ? 'bg-gray-900 text-white rounded-2xl'
      : 'bg-gray-100 text-gray-900 rounded-2xl';
  };

  return (
    <section className="w-full bg-white rounded-2xl p-0 border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-gray-700" />
          <div className="font-medium">Chat with {name || 'your companion'}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1.5 text-sm rounded-lg border ${layout==='standard' ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300'}`}
            onClick={()=>setLayout('standard')}
            title="Standard layout"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            className={`px-3 py-1.5 text-sm rounded-lg border ${layout==='whatsapp' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-300'}`}
            onClick={()=>setLayout('whatsapp')}
            title="WhatsApp-style"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className={`h-[46vh] md:h-[52vh] overflow-y-auto p-4 ${layout==='whatsapp' ? 'bg-[url(https://images.unsplash.com/photo-1695740633675-d060b607f5c4?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjIxNzI2NDR8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)] bg-cover' : 'bg-white'}`}>
        <div className="max-w-2xl mx-auto space-y-3">
          {messages.map((m, idx)=> (
            <div key={idx} className={`flex ${m.role==='user'? 'justify-end':'justify-start'}`}>
              <div className={`px-4 py-2 ${bubbleClasses(m.role)} shadow-sm max-w-[80%] text-sm whitespace-pre-wrap`}>{m.text}</div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="max-w-2xl mx-auto flex gap-2">
          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e)=>{ if (e.key==='Enter') send(); }}
            placeholder={baseline==='dry' ? 'type...' : 'tell me anything :)'}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button onClick={send} className="px-4 py-2 rounded-lg bg-gray-900 text-white">Send</button>
        </div>
        <div className="max-w-2xl mx-auto mt-2 text-[11px] text-gray-500">
          Baseline style: {baseline}. The companion adapts when your tone changes.
        </div>
      </div>
    </section>
  );
}
