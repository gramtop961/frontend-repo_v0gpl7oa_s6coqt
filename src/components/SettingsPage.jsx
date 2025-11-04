import React from 'react';
import SettingsPanel from './SettingsPanel';

export default function SettingsPage({ settings, setSettings }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <SettingsPanel settings={settings} setSettings={setSettings} />
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-2">Safety & Personalization</h3>
        <p className="text-sm text-gray-600">
          Fine-tune tone and boundaries. These preferences guide how your companion responds across the app. You can revisit this anytime.
        </p>
      </div>
    </div>
  );
}
