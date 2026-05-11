import React from 'react';
import { Search, Key } from 'lucide-react';
import { useAuth, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export default function HomePage() {
  // Inicializamos el hook de Clerk para verificar si hay un usuario logueado
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="tab-enter space-y-8 vt323-regular">
      {/* Cabecera / Buscador */}
      <header className="flex justify-between items-center gap-4 glass-panel p-3 pl-5 rounded-xl vt323-regular">
        <div className="flex items-center text-purple-400 flex-1">
          <Search className="w-5 h-5 mr-3" />
          <input type="text" placeholder="Buscar registros corruptos..." className="bg-transparent border-none outline-none w-full text-purple-100 font-semibold placeholder-purple-500/70 Orbit-crew" />
        </div>
        <div className="flex items-center gap-4 vt323-regular">
          
          {/* Lógica condicional a prueba de fallos de Turbopack */}
          {isLoaded && !isSignedIn && (
            <Link href="/sign-in" className="text-purple-400 flex items-center gap-2 font-bold hover:text-[#39ff14] px-4 transition vt323-regular">
              <Key className="w-4 h-4" />
              <span className="text-xs tracking-widest uppercase vt323-regular vt323-regular">Acceder</span>
            </Link>
          )}

          {/* FIX: Avatar sin deformar y usando las propiedades nativas de Clerk */}
          {isLoaded && isSignedIn && (
            <UserButton 
              afterSignOutUrl="/" 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 border-2 border-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.5)] rounded-full hover:scale-110 transition-transform"
                }
              }}
            />
          )}

        </div>
      </header>

      {/* Hero Banner */}
      <section className="glass-panel rounded-2xl p-12 relative overflow-hidden border border-purple-500/40 h-96 flex flex-col justify-center group group vt323-regular">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
        {/* Resplandor de fondo */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/30 blur-[80px] rounded-full group-hover:bg-[#39ff14]/20 transition duration-700"></div>
        
        <div className="relative z-10 vt323-regular">
          <span className="inline-block px-3 py-1 bg-red-900/50 text-red-400 border border-red-500/50 text-xs font-bold tracking-widest rounded mb-4 animate-pulse vt323-regular">ALERTA ROJA</span>
          <h2 className="text-5xl font-extrabold mb-3 uppercase tracking-wider text-white drop-shadow-[0_0_10px_rgba(138,43,226,0.8)] Orbit-crew">La Noche Sin Fin</h2>
          <p className="text-purple-200 text-lg max-w-xl font-light vt323-regular vt323-regular">
            El faro ha caído. Las criaturas acechan en las afueras de Pitcharcity. ¿Quién sobrevivirá hasta el amanecer? Lee los últimos registros.
          </p>
          <button className="mt-8 neon-btn font-bold px-10 py-4 rounded text-sm vt323-regular vt323-regular">
            DESENCRIPTAR LORE
          </button>
        </div>
      </section>

      {/* Grid de Noticias */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 vt323-regular">
          
          {/* Tarjeta 1 */}
          <article className="creepy-card rounded-xl h-56 relative overflow-hidden p-6 flex flex-col justify-end cursor-pointer group group vt323-regular">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/criss-xcross.png')] opacity-10"></div>
              <div className="absolute top-4 left-4 bg-black/60 border border-red-500/50 px-3 py-1 rounded text-[10px] font-bold text-red-400 tracking-wider vt323-regular">
                  💀 INCIDENTE
              </div>
              <div className="relative z-10 vt323-regular">
                  <h3 className="text-xl font-bold mb-1 text-purple-100 group-hover:text-[#39ff14] transition-colors Orbit-crew">Infección en el Sector 4</h3>
                  <p className="text-xs text-purple-400 opacity-80 font-mono vt323-regular vt323-regular">ID_REG: 4092 • 26 Mar, 2026</p>
              </div>
          </article>

          {/* Tarjeta 2 */}
          <article className="creepy-card rounded-xl h-56 relative overflow-hidden p-6 flex flex-col justify-end cursor-pointer group group vt323-regular">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/criss-xcross.png')] opacity-10"></div>
              <div className="absolute top-4 left-4 bg-black/60 border border-purple-500/50 px-3 py-1 rounded text-[10px] font-bold text-purple-400 tracking-wider vt323-regular">
                  👁️ AVISTAMIENTO
              </div>
              <div className="relative z-10 vt323-regular">
                  <h3 className="text-xl font-bold mb-1 text-purple-100 group-hover:text-[#39ff14] transition-colors Orbit-crew">La Sombra del Alcalde</h3>
                  <p className="text-xs text-purple-400 opacity-80 font-mono vt323-regular vt323-regular">ID_REG: 4088 • 13 Mar, 2026</p>
              </div>
          </article>
      </section>
    </div>
  );
}