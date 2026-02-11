import '../index.css';

import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex relative flex-col justify-center items-center min-h-screen gap-6 px-6 bg-white">
      {/* Reddit Identity */}
      <img
        className="object-contain w-1/2 max-w-[200px]"
        src="/snoo.png"
        alt="Reddit Snoo"
      />

      {/* App Identity */}
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-4xl font-extrabold text-center text-[#d93900]">
          DailyConsensus
        </h1>

        <p className="text-lg text-center text-gray-800 font-medium">
          Can Reddit agree… even for one day?
        </p>

        <p className="text-sm text-center text-gray-500 max-w-md">
          One question appears daily. Vote your truth.  
          Debate in the comments.  
          If 70% agree — Reddit wins. Otherwise… Reddit stays Reddit.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-4">
        <button
          className="bg-[#d93900] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:opacity-95 transition"
          onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        >
          Start Today’s Debate
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-gray-400">
        Playing as {context.username ?? 'a Redditor'}
      </footer>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
