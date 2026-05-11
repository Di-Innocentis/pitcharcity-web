import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function LawsPage() {
  return (
    <div className="tab-enter space-y-6 vt323-regular">
        <div className="glass-panel p-10 rounded-xl border border-red-500/50 text-center h-96 flex flex-col items-center justify-center vt323-regular vt323-regular">
            <AlertTriangle className="w-16 h-16 text-red-500 mb-4 animate-pulse vt323-regular" />
            <h2 className="text-2xl font-bold text-red-200 uppercase tracking-widest Orbit-crew">El Caos no tiene reglas...</h2>
            <p className="text-red-400 mt-2 font-mono vt323-regular">Solo sobrevive el más fuerte.</p>
        </div>
    </div>
  );
}