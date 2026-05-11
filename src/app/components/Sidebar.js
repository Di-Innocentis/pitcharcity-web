import React from 'react';
import { Home, Ghost, Book, AlertTriangle, MessageSquare, Eye, Radio } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navLinks = [
    { id: 'inicio', icon: <Home className="w-5 h-5" />, label: 'INICIO' },
    { id: 'sobrevivientes', icon: <Ghost className="w-5 h-5" />, label: 'SOBREVIVIENTES' },
    { id: 'lore', icon: <Book className="w-5 h-5" />, label: 'EL LORE OSCURO' },
    { id: 'leyes', icon: <AlertTriangle className="w-5 h-5" />, label: 'LEYES DEL CAOS' },
    { id: 'foros', icon: <MessageSquare className="w-5 h-5" />, label: 'FORO' },
    { id: 'clips', icon: <Eye className="w-5 h-5" />, label: 'CLIPS PERDIDOS' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 glass-panel h-full flex flex-col py-6 overflow-y-auto no-scrollbar relative z-10 border-r border-purple-900/50">
      
      {/* Contenedor del Logo con Imagen Ajustada (Sin texto inferior) */}
      <div className="mb-10 flex flex-col items-center relative cursor-pointer group pt-4">
        <div className="relative">
          {/* Tamaño w-56 y drop-shadow suavizado */}
          <img 
            src="/image_340025.png" 
            alt="Orbit Crew Logo"
            className="w-56 h-auto object-contain drop-shadow-[0_0_8px_rgba(57,255,20,0.4)] group-hover:animate-glitch transition-all duration-300"
          />
          {/* Brillo sutil al hacer hover */}
          <div className="absolute inset-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-10 pointer-events-none mix-blend-overlay animate-pulse"></div>
        </div>
      </div>

      <nav className="w-full px-4 flex-1">
        <ul className="space-y-2 vt323-regular">
          {navLinks.map(link => {
            const isActive = activeTab === link.id;
            const baseClasses = "w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-bold transition border";
            const activeClasses = "bg-purple-900/40 text-[#39ff14] border-[#39ff14]/30 shadow-[0_0_10px_rgba(57,255,20,0.1)]";
            const inactiveClasses = "text-purple-300 border-transparent hover:text-[#39ff14] hover:bg-purple-900/40 glitch-hover";
            
            return (
              <li key={link.id}>
                <button 
                  onClick={() => setActiveTab(link.id)} 
                  className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                >
                  {link.icon}
                  <span className="tracking-wider text-left vt323-regular">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="w-full px-6 mt-8 vt323-regular">
        <button className="w-full neon-btn font-bold py-3 rounded-lg text-xs flex justify-center items-center gap-2">
          <Radio className="w-4 h-4" />
          SEÑAL DE SOCORRO
        </button>
      </div>
    </aside>
  );
}