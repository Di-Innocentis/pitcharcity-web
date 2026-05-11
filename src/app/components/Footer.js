import React from 'react';

export default function Footer() {
  return (
    <footer className="max-w-[1400px] mx-auto mt-12 mb-4 border-t border-purple-900/50 pt-6 text-center vt323-regular vt323-regular">
      <p className="text-[11px] font-mono text-purple-500/70 tracking-widest uppercase vt323-regular">
        Orbit crew © todos los derechos reservados 
        <br />
        <span className="text-purple-400/60 mt-2 inline-block vt323-regular vt323-regular vt323-regular">desarrollado por <span className="text-[#39ff14] font-bold drop-shadow-[0_0_5px_rgba(57,255,20,0.8)] vt323-regular">DinoSoft</span></span>
      </p>
    </footer>
  );
}