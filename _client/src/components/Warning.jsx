import React from 'react';

const Warning = () => {
  return (
    <div className="w-full bg-[#1a0d0f] border-b border-red-900/40">
      <div className="max-w-6xl mx-auto px-4 py-7 text-center">
        <div className="inline-block px-6 py-4 rounded-xl bg-[#2b0f12]/70 border border-red-900/50 shadow-[0_0_25px_-10px_rgba(255,0,0,0.2)] backdrop-blur-md">
          <p className="text-xs font-semibold tracking-wider text-red-400 mb-1">WARNING</p>
          <p className="text-lg font-semibold text-red-200 tracking-tight">
            AI runs locally… on <span className="text-red-300">my</span> laptop.
          </p>
          <p className="text-sm text-red-400 mt-1">
            You just get the privilege of looking at this beautiful interface.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Warning;
