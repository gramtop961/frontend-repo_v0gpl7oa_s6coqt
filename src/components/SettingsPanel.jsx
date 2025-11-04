import React from 'react';
import { Settings } from 'lucide-react';

export default function SettingsPanel({ settings, setSettings }) {
  const update = (key, value) => setSettings({ ...settings, [key]: value });

  return (
    <section className="w-full bg-white rounded-2xl p-6 md:p-8 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <Settings className="w-5 h-5 text-gray-700" />
        <h2 className="text-xl font-semibold">Safety & tone settings</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Teasing intensity</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-300"
            value={settings.teasing}
            onChange={(e)=>update('teasing', e.target.value)}
          >
            <option>None</option>
            <option>Mild</option>
            <option>Harsh</option>
          </select>

          <label className="text-sm font-medium text-gray-700 mt-4">Crush / attachment</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-300"
            value={settings.crush}
            onChange={(e)=>update('crush', e.target.value)}
          >
            <option>Off</option>
            <option>On</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Romantic tone</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-300"
            value={settings.romance}
            onChange={(e)=>update('romance', e.target.value)}
          >
            <option>None</option>
            <option>Light</option>
            <option>Moderate</option>
          </select>

          <label className="text-sm font-medium text-gray-700 mt-4">Boundaries & tone</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-300"
            value={settings.boundaries}
            onChange={(e)=>update('boundaries', e.target.value)}
          >
            <option>Strict</option>
            <option>Balanced</option>
            <option>Relaxed</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">Swearing tolerance</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-gray-300"
            value={settings.swearing}
            onChange={(e)=>update('swearing', e.target.value)}
          >
            <option>None</option>
            <option>Mild</option>
          </select>

          <div className="mt-4 text-xs text-gray-600">
            Therapist never swears and stays neutral. Parent and mentor stay professional and supportive. Friends and siblings may be playful within safe limits.
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
        By continuing you agree not to request or share personal information, explicit content, or media. Violations pause the chat until you acknowledge the Terms & Conditions.
      </div>
    </section>
  );
}
