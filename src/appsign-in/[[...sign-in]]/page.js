import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#090011] relative overflow-hidden">
        {/* Efectos de fondo de la web */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/criss-xcross.png')] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center mt-4">
            {/* Logo de Orbit Oficial */}
            <img 
              src="/orbit-logo.png" 
              alt="Orbit Crew Logo" 
              className="w-72 md:w-80 mb-8 drop-shadow-[0_0_15px_rgba(57,255,20,0.6)] hover:scale-105 hover:drop-shadow-[0_0_25px_rgba(57,255,20,0.9)] transition-all duration-500" 
            />

            {/* El formulario ya viene con el borde neón y fondo morado desde layout.js */}
            <SignIn />
        </div>
    </div>
  );
}
