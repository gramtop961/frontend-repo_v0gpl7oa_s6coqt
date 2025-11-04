import React, { useMemo } from 'react';
import { User, Wand2 } from 'lucide-react';

const FIGURES = {
  male: [
    { id: 'male_mentor', label: 'Male Mentor' },
    { id: 'father', label: 'Father Figure' },
    { id: 'brother', label: 'Brother Figure' },
    { id: 'male_friend', label: 'Male Friend Figure' },
    { id: 'therapist', label: 'Therapist (neutral)' },
  ],
  female: [
    { id: 'female_mentor', label: 'Female Mentor' },
    { id: 'mother', label: 'Mother Figure' },
    { id: 'sister', label: 'Sister Figure' },
    { id: 'female_friend', label: 'Female Friend Figure' },
    { id: 'therapist', label: 'Therapist (neutral)' },
  ],
};

const randomName = () => {
  const first = ['Ava','Liam','Maya','Noah','Zoe','Kai','Ivy','Leo','Mila','Nico','Rhea','Aria','Theo','Skye'];
  const last = ['Ray','Vale','Banks','Lane','Quinn','Wilde','Storm','Dune','Rey','Hart'];
  return `${first[Math.floor(Math.random()*first.length)]} ${last[Math.floor(Math.random()*last.length)]}`;
};

export default function FigureSelector({
  gender,
  setGender,
  figureId,
  setFigureId,
  traits,
  setTraits,
  name,
  setName,
  useMemory,
  setUseMemory,
}) {
  const availableFigures = useMemo(() => {
    if (gender === 'male') return FIGURES.male;
    if (gender === 'female') return FIGURES.female;
    return [...FIGURES.male, ...FIGURES.female];
  }, [gender]);

  const isTherapist = figureId === 'therapist';
  const isMentor = figureId?.includes('mentor');
  const isParent = figureId === 'father' || figureId === 'mother';

  return (
    <section className="w-full bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <User className="w-5 h-5 text-gray-700" />
        <h2 className="text-xl font-semibold">Choose your companion</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">Gender preference</p>
          <div className="flex gap-2 flex-wrap">
            {['male','female','any'].map(g => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`px-4 py-2 rounded-lg border text-sm ${gender===g? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                {g === 'any' ? "Don't care" : g.charAt(0).toUpperCase()+g.slice(1)}
              </button>
            ))}
          </div>

          <p className="text-sm font-medium text-gray-700 mt-6">Available figures</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {availableFigures.map(f => (
              <button
                key={f.id}
                onClick={() => setFigureId(f.id)}
                className={`px-3 py-2 rounded-lg border text-left ${figureId===f.id? 'bg-blue-50 border-blue-500' : 'border-gray-300 hover:bg-gray-50'}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">Companion name</p>
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter a name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <button
              onClick={()=> setName(randomName())}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <Wand2 className="w-4 h-4" /> Random
            </button>
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" checked={useMemory} onChange={(e)=>setUseMemory(e.target.checked)} />
              Use previous memories for this companion
            </label>
            <p className="text-xs text-gray-500 mt-1">Turn off to start fresh as a brand-new person.</p>
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-sm font-medium text-gray-700">Personality & traits {isTherapist && <span className="text-xs text-gray-500">(Therapist is neutral, traits disabled)</span>}</p>

          {[
            { key: 'calmEnergetic', labelLeft: 'Calm', labelRight: 'Energetic' },
            { key: 'seriousPlayful', labelLeft: 'Serious', labelRight: 'Playful' },
            { key: 'supportiveChallenging', labelLeft: 'Supportive', labelRight: 'Challenging' },
            { key: 'logicalEmotional', labelLeft: 'Logical', labelRight: 'Emotional' },
          ].map((sl)=> (
            <div key={sl.key} className={`opacity-${isTherapist? '50':'100'} pointer-events-${isTherapist? 'none':'auto'}`}>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>{sl.labelLeft}</span>
                <span>{sl.labelRight}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={traits[sl.key]}
                onChange={(e)=> setTraits({ ...traits, [sl.key]: Number(e.target.value) })}
                className="w-full accent-gray-900"
              />
            </div>
          ))}

          {isMentor && (
            <div>
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Gentle</span>
                <span>Harsh</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={traits.harshness}
                onChange={(e)=> setTraits({ ...traits, harshness: Number(e.target.value) })}
                className="w-full accent-gray-900"
              />
              <p className="text-xs text-gray-500 mt-1">Mentor harshness level: {traits.harshness}</p>
            </div>
          )}

          {isParent && (
            <div className="text-xs text-gray-600">
              Parent figures blend guidance with affection: expect warmth + accountability.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
