import React from 'react';
import { User } from 'lucide-react';

export default function SurvivorsPage({ survivors, isClient }) {
  return (
    <div className="tab-enter space-y-6 vt323-regular">
      <div className="glass-panel p-5 rounded-xl flex items-center justify-between border border-purple-500/50 vt323-regular">
          <div>
              <h2 className="text-2xl font-bold text-white uppercase tracking-widest drop-shadow-[0_0_10px_rgba(138,43,226,0.8)] Orbit-crew">Sobrevivientes Registrados</h2>
              <p className="text-sm font-mono text-purple-400 mt-1 vt323-regular">Censo poblacional de Pitcharcity.</p>
          </div>
          <div className="text-right">
              <span className="text-3xl font-extrabold text-[#39ff14] drop-shadow-[0_0_10px_rgba(57,255,20,0.8)] vt323-regular">30</span>
              <span className="text-xs font-bold text-purple-400 block uppercase vt323-regular vt323-regular">Entidades</span>
          </div>
      </div>

      {/* Cuadrícula de los 30 miembros */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 vt323-regular vt323-regular">
          {survivors.map((name, index) => {
              // Simulación temporal de estado (Se reemplazará con API de Twitch después)
              const isAlive = isClient ? Math.random() > 0.3 : false; 
              const statusColor = isAlive ? 'text-[#39ff14]' : 'text-purple-600';
              const statusText = isAlive ? 'EN LÍNEA' : 'DESCONECTADO';
              const borderHover = isAlive ? 'hover:border-[#39ff14]' : 'hover:border-purple-500';

              return (
                <div key={index} className={`creepy-card bg-black/40 rounded-xl p-4 flex flex-col items-center text-center gap-3 cursor-pointer group border border-purple-500/20 ${borderHover} transition-all vt323-regular`}>
                    <div className="w-16 h-16 rounded-full bg-purple-900/30 border-2 border-purple-500/30 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]">
                        <User className="text-purple-400 group-hover:text-purple-200" />
                    </div>
                    <div className="w-full">
                        <h4 className="font-bold text-xs text-purple-200 truncate w-full group-hover:text-white transition-colors vt323-regular" title={name}>{name}</h4>
                        <p className={`text-[9px] font-mono mt-1 ${statusColor} tracking-widest vt323-regular`}>{statusText}</p>
                    </div>
                </div>
              );
          })}
      </div>
    </div>
  );
}