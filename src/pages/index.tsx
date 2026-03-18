import { Geist, Geist_Mono } from "next/font/google";
import MetaMaskAuth from "@/components/MetaMaskAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Icon Components
const FlaskIcon = () => (
  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen items-center justify-center p-8 font-sans`}
    >
      <div className="glass-card flex w-full max-w-xl flex-col items-center gap-8 p-12 text-center">
        {/* Logo & Badge */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/30">
            <FlaskIcon />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Blockchain Secured
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              PKM-KC
            </span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Perangkat Pintar Deteksi Dini Gas Beracun Akibat Pencampuran Kimia Rumah Tangga Berbasis Artificial Neural Network Terintegrasi Web3
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {[
            { icon: "⚗️", label: "Deteksi Bahaya" },
            { icon: "🏆", label: "Sertifikat NFT" },
            { icon: "🔗", label: "Blockchain Record" },
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-xs text-zinc-400">{feature.label}</span>
            </div>
          ))}
        </div>

        {/* MetaMask Auth */}
        <div className="w-full pt-4 border-t border-white/5">
          <MetaMaskAuth />
        </div>

        {/* Network Info */}
        <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-white/5">
          <div className="flex flex-col gap-1 p-4 rounded-xl bg-white/5 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Network</span>
            <span className="text-zinc-200">Polygon Amoy</span>
          </div>
          <div className="flex flex-col gap-1 p-4 rounded-xl bg-white/5 text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Status</span>
            <span className="text-emerald-500 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-zinc-600 text-xs">
          Lindungi keluarga Anda dari bahaya pencampuran bahan kimia
        </p>
      </div>
    </div>
  );
}

