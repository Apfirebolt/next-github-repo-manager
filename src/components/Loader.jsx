'use client';

import React from 'react';

const Loader = ({ 
  label = "Loading, please wait...", 
  fullScreen = true 
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-blood-dark/80 backdrop-blur-sm transition-all ${
        fullScreen ? 'fixed inset-0 z-50 min-h-screen w-full' : 'h-full w-full py-12'
      }`}
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex items-center justify-center">
        {/* Ambient background glow */}
        <div className="absolute h-16 w-16 rounded-full bg-wine/20 blur-xl animate-pulse" />

        {/* Outer static ring track */}
        <div className="h-12 w-12 rounded-full border-2 border-sage/20" />

        {/* Spinning accent ring */}
        <div className="absolute h-12 w-12 animate-spin rounded-full border-2 border-transparent border-t-wine border-r-wine/60" />

        {/* Inner subtle counter-spinning ring */}
        <div className="absolute h-6 w-6 animate-[spin_2s_linear_infinite_reverse] rounded-full border border-transparent border-b-sage/50" />

        {/* Center dot */}
        <div className="absolute h-1.5 w-1.5 rounded-full bg-parchment" />
      </div>

      {/* Loading Label */}
      {label && (
        <p className="mt-4 text-xs font-medium tracking-widest uppercase text-parchment/80 animate-pulse">
          {label}
        </p>
      )}

      {/* Accessible text for screen readers */}
      <span className="sr-only">Loading content</span>
    </div>
  );
};

export default Loader;