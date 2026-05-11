import React from 'react';
import { BookOpen } from 'lucide-react';

export default function LorePage() {
  return (
    <div className="tab-enter space-y-6 vt323-regular">
        <div className="glass-panel p-10 rounded-xl border border-purple-500/50 text-center h-96 flex flex-col items-center justify-center vt323-regular">
            <BookOpen className="w-16 h-16 text-purple-500 mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-purple-200 uppercase tracking-widest vt323-regular Orbit-crew">Archivos Encriptados</h2>
            <p className="text-purple-400 mt-2 font-mono vt323-regular">Los registros del Lore están siendo desencriptados. Vuelve más tarde.</p>
        </div>
    </div>
  );
}