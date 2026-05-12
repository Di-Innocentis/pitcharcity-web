import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#090011] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/criss-xcross.png')] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full"></div>

        <div className="relative z-10 flex flex-col items-center mt-10">
            <h1 className="text-white text-3xl mb-2 font-orbit">
                <span className="font-bold">Orbit</span> crew
            </h1>
            
            <p className="text-[#39ff14] text-5xl md:text-7xl font-bold font-mono uppercase tracking-widest mb-10 drop-shadow-[0_0_15px_rgba(57,255,20,0.8)] text-center">
                ¡ÚNETE A LA AVENTURA!
            </p>

            <SignUp 
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-[#b05bff] hover:bg-[#39ff14] hover:text-black text-white font-bold transition-all",
                        card: "bg-black/60 border border-purple-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(138,43,226,0.2)]",
                        headerTitle: "text-white font-mono text-2xl uppercase tracking-widest",
                        headerSubtitle: "text-purple-400 font-mono",
                        socialButtonsBlockButton: "border-purple-500/50 hover:bg-purple-900/50 text-white",
                        socialButtonsBlockButtonText: "font-mono font-bold",
                        formFieldLabel: "text-purple-300 font-mono",
                        formFieldInput: "bg-black/80 border-purple-500/50 text-white focus:border-[#39ff14] font-mono",
                        footerActionText: "text-purple-400 font-mono",
                        footerActionLink: "text-[#39ff14] hover:text-white font-mono"
                    }
                }} 
            />
        </div>
    </div>
  );
}
