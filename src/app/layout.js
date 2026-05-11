import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { esES } from '@clerk/localizations';
import { dark } from '@clerk/themes';

export const metadata = {
  title: "Pitcharcity Temporada 6 - Orbit crew",
  description: "Sitio oficial de la serie - Desarrollado por DinoSoft",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#39ff14',
          colorBackground: '#130024',
          colorText: '#ffffff',
          colorTextSecondary: '#ffffff',
          fontFamily: '"Space Grotesk", sans-serif',
        },

        elements: {
          // =========================
          // USER BUTTON / POPOVER
          // =========================
          userButtonPopoverCard: [
            "!bg-[#1a0536]/70",
            "!backdrop-blur-2xl",
            "!bg-gradient-to-br !from-[#2a0a4a]/80 !to-[#0d001a]/90",
            "!rounded-3xl",
            "!border-2 !border-[#39ff14]",
            "shadow-[0_0_20px_rgba(57,255,20,0.5),0_0_40px_rgba(128,0,255,0.4)]",
            "!overflow-hidden",
            "!outline-none",
            "!text-white"
          ].join(" "),

          userButtonPopoverMain:
            "!text-white !font-bold !text-xl",

          userButtonPopoverSubtitle:
            "!text-white/80 !text-sm",

          userPreviewMainIdentifier:
            "!text-white !font-bold !text-xl drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]",

          userPreviewSecondaryIdentifier:
            "!text-white/80",

          userButtonPopoverActionButton:
            "!text-white hover:!bg-[#39ff14]/20 !transition-all !rounded-xl !mx-2 !my-1",

          userButtonPopoverActionButtonText:
            "!text-white !text-lg !font-bold !tracking-wider",

          userButtonPopoverActionButtonIconBox:
            "!text-[#39ff14]",

          userButtonPopoverFooter:
            "!hidden",

          // =========================
          // PROFILE / SECURITY / MODAL
          // =========================
          modalBackdrop:
            "!backdrop-blur-md !bg-black/60",

          modalContent: [
            "!bg-[#120021]/95",
            "!rounded-3xl",
            "!overflow-hidden",
            "shadow-[0_0_12px_rgba(57,255,20,0.9),0_0_40px_rgba(57,255,20,0.35),0_0_70px_rgba(128,0,255,0.25)]"
          ].join(" "),

          pageScrollBox:
            "!bg-[#120021]/95 !border-2 !border-[#39ff14] !rounded-3xl",

          // sidebar forzado
          navbar: [
            "!bg-[#1a0536]/95",
            "!text-white",
            "!opacity-100",
            "[&_*]:!text-white",
            "[&_*]:!opacity-100"
          ].join(" "),

          navbarMobileMenuButton:
            "!text-white",

          navbarMobileMenuRow:
            "!text-white",

          navbarMobileMenuText:
            "!text-white",

          navbarButton:
            "!text-white hover:!bg-[#39ff14]/20 rounded-xl",

          navbarButtonText:
            "!text-white",

          navbarButtonIcon:
            "!text-white",

          profilePageTitle:
            "!text-white !opacity-100 !font-extrabold !text-3xl",

          profilePageSubtitle:
            "!text-white !opacity-100",

          pageTitle:
            "!text-white !opacity-100 !font-extrabold !text-3xl",

          pageSubtitle:
            "!text-white !opacity-100",

          profileSectionTitleText:
            "!text-white !font-bold",

          profileSectionTitle:
            "!text-white",

          profileSectionContent:
            "!text-white/80",

          accordionTriggerButton:
            "!text-white !font-bold",

          accordionContent:
            "!text-white",

          formHeaderTitle:
            "!text-white !font-bold",

          formHeaderSubtitle:
            "!text-white/80",

          formFieldLabel:
            "!text-white uppercase tracking-wider text-lg mb-1",

          formFieldInput:
            "!bg-[#1a0536]/80 !border-2 !border-[#39ff14] focus:!border-white !text-white placeholder:!text-white/50 text-lg px-4 py-3 rounded-xl shadow-inner",

          formFieldHintText:
            "!text-white/70",

          formFieldSuccessText:
            "!text-[#39ff14]",

          formFieldWarningText:
            "!text-yellow-300",

          formFieldErrorText:
            "!text-red-400",

          identityPreviewText:
            "!text-white",

          identityPreviewEditButton:
            "!text-[#39ff14]",

          // =========================
          // LOGIN CARD
          // =========================
          card: [
            "!bg-[#120021]/75",
            "!backdrop-blur-xl",
            "!border-2 !border-[#39ff14]",
            "!rounded-3xl",
            "shadow-[0_0_25px_rgba(57,255,20,0.5),0_0_50px_rgba(128,0,255,0.3)]"
          ].join(" "),

          headerTitle:
            "!text-white !font-extrabold text-4xl uppercase tracking-widest drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]",

          headerSubtitle:
            "!text-white/80 text-lg",

          formButtonPrimary:
            "!bg-[#39ff14] !text-black font-extrabold hover:!bg-white shadow-[0_0_15px_rgba(57,255,20,0.8)] text-xl tracking-widest uppercase transition-all py-3 rounded-xl",

          // =========================
          // SOCIAL BUTTONS
          // =========================
          socialButtonsBlockButton:
            "!bg-[#1a0536]/80 !border-2 !border-[#39ff14] hover:!bg-[#39ff14]/10 transition-all rounded-xl",

          socialButtonsBlockButtonText:
            "!text-white uppercase tracking-widest text-lg font-bold",

          socialButtonsProviderIcon:
            "!text-white",

          socialButtonsBlockButtonSubtitle:
            "!text-white/70",

          socialButtonsBlockButtonArrow:
            "!text-white",

          socialButtonsBlockButton__lastButton:
            "!text-white",

          socialButtonsBlockButtonText__lastButton:
            "!text-white",

          dividerText:
            "!text-white/70",

          dividerLine:
            "!bg-[#39ff14]",

          footerActionLink:
            "!text-[#39ff14] hover:!text-white drop-shadow-[0_0_5px_rgba(57,255,20,0.8)] text-lg font-bold",

          footerActionText:
            "!text-white/80 text-lg",

          badge:
            "!hidden",

          footer:
            "!hidden",
        }
      }}
    >
      <html lang="es">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="antialiased bg-[#0d001a]">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}