import React from 'react';
import { Video } from 'lucide-react';

export default function ClipsPage() {
  return (
    <div className="tab-enter space-y-6 vt323-regular">
        <div className="glass-panel p-10 rounded-xl border border-purple-500/50 text-center h-96 flex flex-col items-center justify-center vt323-regular vt323-regular">
            <Video className="w-16 h-16 text-purple-500 mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-purple-200 uppercase tracking-widest Orbit-crew">Frecuencias de Video Perdidas</h2>
            <p className="text-purple-400 mt-2 font-mono vt323-regular">Buscando grabaciones en los escombros...</p>
        </div>
    </div>
  );
}