import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D({ onGetStarted }) {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-2xl bg-white">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/OG17yM2eUIs8MUmA/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-end text-center p-6 md:p-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
          Your AI Companion — warm, playful, and here for you
        </h1>
        <p className="mt-3 md:mt-4 text-gray-600 max-w-2xl">
          Choose a figure, tune their vibe, and chat in a space that feels safe and real.
        </p>
        <div className="mt-6">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-5 py-3 hover:bg-gray-900 active:scale-[0.98] transition"
          >
            Get started
          </button>
        </div>
      </div>
    </section>
  );
}
