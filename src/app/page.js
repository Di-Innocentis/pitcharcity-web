"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Rain from './components/Rain';
import Sidebar from './components/Sidebar';
import HomePage from './components/pages/HomePage';
import SurvivorsPage from './components/pages/SurvivorsPage';
import LorePage from './components/pages/LorePage';
import LawsPage from './components/pages/LawsPage';
import ClipsPage from './components/pages/ClipsPage';
import Widgets from './components/Widgets';
import Footer from './components/Footer';
import ForumPage from './components/pages/ForumPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isClient, setIsClient] = useState(false);

  // Evitar problemas de hidratación en Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Datos compartidos o orquestados
  const survivorsList = useMemo(() => [
    "AlejandroReport", "TheAlex30", "Rubynavx", "ElPipeBro", 
    "LeshliePink", "CentisTV", "Marchelo_9", "Litersh", 
    "EmyTheMocking", "Kirakist", "Lanenyyyy", "Oxxy_",
    "Nombre 1", "Nombre 2", "Nombre 3", "Nombre 4",
    "Nombre 5", "Nombre 6", "Nombre 7", "Nombre 8",
    "Nombre 9", "Nombre 10", "Nombre 11", "Nombre 12",
    "Nombre 13", "Nombre 14", "Nombre 15", "Nombre 16",
    "Nombre 17", "Nombre 18"
  ], []);

  const rainDrops = useMemo(() => {
    if (!isClient) return [];
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 1.5 + 0.5}s`,
      animationDelay: `${Math.random() * 5}s`,
      transform: `scaleY(${Math.random() * 0.5 + 0.5})`
    }));
  }, [isClient]);

  // Estilos globales orquestados para previsualización (mantener en page.js conductor)
  const GlobalOrchestratorStyles = () => (
    <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        
        body {
            background: radial-gradient(ellipse at bottom, #2b004a 0%, #090011 100%);
            color: #e0e0e0;
            overflow: hidden;
            margin: 0;
            height: 100vh;
        }

        @font-face {
            font-family: 'NOW';
            src: url('/fonts/now-bold.otf') format('opentype');
            font-weight: bold;
            font-style: normal;
        }

        .Orbit-crew {
            font-family: 'NOW', sans-serif;
        }

        .vt323-regular {
          font-family: "VT323", monospace;
          font-weight: 400;
          font-style: normal;
        }

        .acid-drop {
            position: absolute;
            background: #39ff14; 
            width: 2px;
            height: 20px;
            box-shadow: 0 0 8px 2px rgba(57, 255, 20, 0.6);
            opacity: 0;
            animation: fall linear infinite;
        }
        @keyframes fall {
            0% { transform: translateY(-50px); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.5; }
            100% { transform: translateY(110vh); opacity: 0; }
        }

        .glass-panel {
            background: rgba(15, 5, 25, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(138, 43, 226, 0.3);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        .neon-btn {
            position: relative;
            background: transparent;
            color: #b05bff;
            border: 1px solid #b05bff;
            box-shadow: 0 0 10px rgba(176, 91, 255, 0.4), inset 0 0 10px rgba(176, 91, 255, 0.2);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
            overflow: hidden;
        }
        .neon-btn::before {
            content: '';
            position: absolute;
            top: 0; left: -100%;
            width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.4), transparent);
            transition: all 0.4s ease;
        }
        .neon-btn:hover {
            color: #000;
            background: #39ff14;
            border-color: #39ff14;
            box-shadow: 0 0 20px #39ff14, inset 0 0 10px #39ff14;
            text-shadow: none;
        }
        .neon-btn:hover::before {
            left: 100%;
        }

        .creepy-card {
            transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
            border: 1px solid rgba(138, 43, 226, 0.4);
            background: linear-gradient(180deg, rgba(20, 5, 35, 0.8) 0%, rgba(5, 0, 10, 0.9) 100%);
        }
        .creepy-card:hover {
            transform: translateY(-5px) scale(1.02);
            border-color: #39ff14;
            box-shadow: 0 10px 30px -5px rgba(57, 255, 20, 0.3);
        }

        @keyframes creepyPulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
        }
        .live-indicator { animation: creepyPulse 2s infinite; }

        .glitch-hover:hover {
            animation: glitch-skew 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
            color: #39ff14;
        }
        @keyframes glitch-skew {
            0% { transform: skew(0deg); }
            20% { transform: skew(-5deg); }
            40% { transform: skew(5deg); }
            60% { transform: skew(-2deg); }
            80% { transform: skew(2deg); }
            100% { transform: skew(0deg); }
        }
        
        .tab-enter { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `}} />
  );

  return (
    <div className="flex h-screen text-gray-200">
      <GlobalOrchestratorStyles />
      
      {/* Componente Modular de Lluvia */}
      <Rain drops={rainDrops} />

      {/* Componente Modular de Barra Lateral */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* CONTENEDOR PRINCIPAL Conductor */}
      <div className="flex-1 h-full overflow-y-auto no-scrollbar relative z-10 p-6 vt323-regular vt323-regular">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 vt323-regular vt323-regular">
              
              {/* COLUMNA CENTRAL (Orquestación de Pestañas Modulares) */}
              <main className="flex-1 space-y-8 relative min-h-[600px] vt323-regular vt323-regular">
                  {activeTab === 'inicio' && <HomePage />}
                  {activeTab === 'sobrevivientes' && <SurvivorsPage survivors={survivorsList} isClient={isClient} />}
                  {activeTab === 'lore' && <LorePage />}
                  {activeTab === 'leyes' && <LawsPage />}
                  
                  {/* AÑADIDO: Renderizado de la pestaña de Foros */}
                  {activeTab === 'foros' && <ForumPage />}
                  
                  {activeTab === 'clips' && <ClipsPage />}
              </main>

              {/* Componente Modular de Widgets */}
              <Widgets />
          </div>

          {/* Componente Modular de Pie de Página */}
          <Footer />
      </div>
    </div>
  );
}