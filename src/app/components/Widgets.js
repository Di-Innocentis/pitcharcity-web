"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight, Globe, ExternalLink, Radio, Users } from 'lucide-react'; // Añadido 'Users'

export default function Widgets() {
  const [streamers, setStreamers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRadar = async () => {
      try {
        const response = await fetch('/api/streamers');
        if (!response.ok) throw new Error('Error en el radar');
        const data = await response.json();
        setStreamers(data);
      } catch (error) {
        console.error("Fallo al conectar con la matriz:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRadar();
    
    // Se actualiza automáticamente cada 2 minutos (120000 ms)
    const interval = setInterval(fetchRadar, 120000);
    return () => clearInterval(interval);
  }, []);

  // Función de enrutamiento a la plataforma
  const abrirTransmision = (plataforma, nombre) => {
    const url = plataforma === 'twitch' 
      ? `https://twitch.tv/${nombre}` 
      : `https://kick.com/${nombre}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside className="w-full lg:w-80 space-y-6 flex-shrink-0 vt323-regular">
      
      {/* Widget Discord */}
      <div className="glass-panel rounded-xl p-5 border border-[#5865F2]/50 hover:border-[#39ff14] hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all cursor-pointer group group vt323-regular">
          <div className="flex items-center justify-between vt323-regular">
              <div className="flex items-center gap-3 vt323-regular">
                  <div className="p-2 bg-[#5865F2]/20 rounded-lg group-hover:bg-[#39ff14]/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#5865F2" className="group-hover:fill-[#39ff14] transition-colors" viewBox="0 0 16 16">
                          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
                      </svg>
                  </div>
                  <div className="vt323-regular">
                      <h4 className="font-extrabold text-white tracking-widest uppercase text-sm group-hover:text-[#39ff14] transition-colors vt323-regular">Comunicaciones</h4>
                      <p className="text-xs font-mono text-purple-400 mt-0.5 vt323-regular">666 Entidades En Línea</p>
                  </div>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-500 group-hover:text-[#39ff14] transition-colors" />
          </div>
      </div>

      {/* Widget Transmisiones en Vivo */}
      <div className="glass-panel rounded-xl border border-purple-500/30 overflow-hidden vt323-regular flex flex-col max-h-96">
          <div className="bg-black/40 p-4 border-b border-purple-900/50 flex justify-between items-center vt323-regular flex-shrink-0">
              <h4 className="font-bold text-white text-xs tracking-[0.2em] uppercase vt323-regular">Señales Detectadas</h4>
              {loading ? (
                <Radio className="w-4 h-4 text-purple-500 animate-spin" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-red-500 live-indicator vt323-regular"></div>
              )}
          </div>
          
          <ul className="p-2 space-y-1 vt323-regular overflow-y-auto no-scrollbar flex-1">
              {loading && <p className="text-center text-purple-500 py-4 text-xs tracking-widest">RASTREANDO SEÑALES...</p>}
              
              {!loading && streamers.map((streamer, index) => (
                  <li 
                    key={index} 
                    onClick={() => abrirTransmision(streamer.plataforma, streamer.nombre)}
                    className={`flex items-center gap-3 p-3 rounded transition cursor-pointer border 
                      ${streamer.enVivo ? 'hover:bg-white/5 border-transparent hover:border-[#39ff14]/30' : 'opacity-50 hover:opacity-100 border-transparent'} 
                    vt323-regular`}
                  >
                      <div className="relative">
                          {/* CONTENEDOR DE LA IMAGEN ACTUALIZADO */}
                          <div className={`w-10 h-10 rounded border flex items-center justify-center overflow-hidden vt323-regular 
                            ${streamer.enVivo ? 'bg-purple-900/80 border-purple-500/50 grayscale-0' : 'bg-black/50 border-purple-900/50 grayscale'}
                          `}>
                              {streamer.avatar ? (
                                <img 
                                  src={streamer.avatar} 
                                  alt={streamer.nombre} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-xl vt323-regular">
                                  {streamer.plataforma === 'twitch' ? '🟪' : '🟩'}
                                </span>
                              )}
                          </div>

                          {streamer.enVivo && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#39ff14] border-2 border-[#1a0033] rounded-full shadow-[0_0_8px_#39ff14]"></div>
                          )}
                      </div>
                      
                      <div className="flex-1 overflow-hidden">
                          <div className="flex items-center justify-between vt323-regular">
                              <h5 className={`font-bold text-sm vt323-regular truncate ${streamer.enVivo ? 'text-purple-200' : 'text-purple-500'}`}>
                                {streamer.nombre}
                              </h5>
                              
                              {/* NUEVO: Bloque de espectadores + Badge Vivo */}
                              {streamer.enVivo && (
                                <div className="flex items-center gap-2">
                                  <span className="flex items-center gap-1 text-[11px] text-[#39ff14] font-mono">
                                    <Users className="w-3 h-3 text-purple-400" />
                                    {streamer.espectadores}
                                  </span>
                                  <span className={`text-[9px] font-bold text-black px-1.5 py-0.5 rounded uppercase tracking-wider vt323-regular 
                                    ${streamer.plataforma === 'twitch' ? 'bg-[#9146FF]' : 'bg-[#53FC18]'}`}>
                                    VIVO
                                  </span>
                                </div>
                              )}
                          </div>
                          <p className={`text-[11px] font-mono truncate w-full vt323-regular 
                            ${streamer.enVivo ? 'text-purple-400' : 'text-purple-700'}`}>
                            {streamer.titulo}
                          </p>
                      </div>
                  </li>
              ))}

              {!loading && streamers.length === 0 && (
                 <p className="text-center text-red-500 py-4 text-xs tracking-widest">SISTEMA OFFLINE</p>
              )}
          </ul>
      </div>

      {/* Widget Acceso Proyectos */}
      <div className="glass-panel rounded-xl p-6 border border-[#39ff14]/30 relative overflow-hidden group vt323-regular">
          <div className="absolute inset-0 bg-gradient-to-br from-[#39ff14]/5 to-transparent pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center vt323-regular">
              <img 
                src="/orbit-logo.png" 
                alt="Orbit Crew Hub" 
                className="w-36 h-auto mb-4 drop-shadow-[0_0_8px_rgba(57,255,20,0.3)] group-hover:scale-105 transition-transform duration-500 object-cover"
              />
              {/* Estructura actualizada para el branding oficial */}
              <h4 className="text-sm drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] Orbit-crew tracking-[0.2em]">
                <span className="font-bold text-white uppercase">Descarga el cliente</span>
              </h4>
              <p className="text-[11px] text-purple-400 mt-2 mb-5 leading-tight font-mono vt323-regular">
                ¿Quieres explorar nuestro ecosistema? Accede a la central para conocer más sobre el cliente, el servidor y los desarrollos activos de la tripulación.
              </p>
              
              <a 
                href="https://orbitcrew.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full neon-btn py-2.5 text-[11px] font-bold rounded flex items-center justify-center gap-2 group/btn uppercase tracking-widest"
              >
                <Globe className="w-4 h-4" />
                Visitar Orbit
                <ExternalLink className="w-3 h-3 opacity-50 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
          </div>
      </div>

    </aside>
  );
}