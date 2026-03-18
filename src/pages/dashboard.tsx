import { Geist, Geist_Mono } from "next/font/google";
import { useActiveAccount, useDisconnect, useActiveWallet } from "thirdweb/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);

const ShieldIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
);

const BlockchainIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);

const NFTIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
);

const AlertIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

const HistoryIcon = () => (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

// Sample chemical data
const chemicals = [
    { name: "Pemutih (Bleach)", formula: "NaClO", danger: "high" },
    { name: "Pembersih Kamar Mandi", formula: "HCl", danger: "high" },
    { name: "Sabun Cuci Piring", formula: "Surfactant", danger: "low" },
    { name: "Cuka", formula: "CH₃COOH", danger: "medium" },
    { name: "Amonia", formula: "NH₃", danger: "high" },
    { name: "Pembersih Kaca", formula: "NH₄OH", danger: "medium" },
];

export default function Dashboard() {
    const account = useActiveAccount();
    const wallet = useActiveWallet();
    const { disconnect } = useDisconnect();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [selectedChemical1, setSelectedChemical1] = useState("");
    const [selectedChemical2, setSelectedChemical2] = useState("");
    const [checkResult, setCheckResult] = useState<null | { safe: boolean; message: string }>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !account) {
            router.push("/");
        }
    }, [account, mounted, router]);

    const handleDisconnect = async () => {
        if (wallet) {
            await disconnect(wallet);
            router.push("/");
        }
    };

    const handleCheckCompatibility = () => {
        if (!selectedChemical1 || !selectedChemical2) {
            setCheckResult({ safe: false, message: "Pilih dua bahan kimia untuk dicek" });
            return;
        }

        // Dangerous combinations
        const dangerousCombos = [
            ["Pemutih (Bleach)", "Pembersih Kamar Mandi"],
            ["Pemutih (Bleach)", "Amonia"],
            ["Pemutih (Bleach)", "Cuka"],
            ["Amonia", "Pembersih Kamar Mandi"],
        ];

        const isDangerous = dangerousCombos.some(
            ([a, b]) =>
                (selectedChemical1 === a && selectedChemical2 === b) ||
                (selectedChemical1 === b && selectedChemical2 === a)
        );

        if (isDangerous) {
            setCheckResult({
                safe: false,
                message: `⚠️ BAHAYA! Mencampurkan ${selectedChemical1} dengan ${selectedChemical2} dapat menghasilkan gas beracun yang berbahaya bagi kesehatan!`,
            });
        } else if (selectedChemical1 === selectedChemical2) {
            setCheckResult({
                safe: true,
                message: "Pilih dua bahan kimia yang berbeda untuk pengecekan.",
            });
        } else {
            setCheckResult({
                safe: true,
                message: `✓ Kombinasi ${selectedChemical1} dan ${selectedChemical2} relatif aman. Tetap gunakan dengan hati-hati.`,
            });
        }
    };

    if (!mounted || !account) {
        return (
            <div className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen items-center justify-center`}>
                <div className="animate-pulse text-zinc-400">Loading...</div>
            </div>
        );
    }

    const shortAddress = `${account.address.slice(0, 6)}...${account.address.slice(-4)}`;

    return (
        <div className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans`}>
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                                <FlaskIcon />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                                ChemSafe
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm text-zinc-300">{shortAddress}</span>
                            </div>
                            <button
                                onClick={handleDisconnect}
                                className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all text-sm font-medium"
                            >
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm mb-6">
                            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                            Powered by Blockchain Technology
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                                Sistem Peringatan Dini
                            </span>
                            <br />
                            <span className="text-white">
                                Bahaya Pencampuran Bahan Kimia
                            </span>
                        </h1>
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                            Platform berbasis NFT & Blockchain untuk mencegah kecelakaan akibat pencampuran
                            bahan kimia rumah tangga yang berbahaya. Lindungi keluarga Anda dengan teknologi terdesentralisasi.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                        {[
                            { label: "Bahan Kimia Terdaftar", value: "150+", color: "from-blue-500 to-cyan-500" },
                            { label: "Kombinasi Berbahaya", value: "500+", color: "from-red-500 to-orange-500" },
                            { label: "Sertifikat NFT", value: "1,234", color: "from-purple-500 to-pink-500" },
                            { label: "Pengguna Aktif", value: "5,678", color: "from-emerald-500 to-teal-500" },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-6 text-center group hover:border-white/20 transition-all">
                                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-zinc-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Chemical Compatibility Checker */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-card p-8 border-amber-500/20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                                <AlertIcon />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Cek Kompatibilitas Bahan Kimia</h2>
                                <p className="text-zinc-400">Periksa apakah dua bahan kimia aman untuk dicampurkan</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Bahan Kimia 1</label>
                                <select
                                    value={selectedChemical1}
                                    onChange={(e) => setSelectedChemical1(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                                >
                                    <option value="">Pilih bahan kimia...</option>
                                    {chemicals.map((chem, i) => (
                                        <option key={i} value={chem.name} className="bg-zinc-900">
                                            {chem.name} ({chem.formula})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Bahan Kimia 2</label>
                                <select
                                    value={selectedChemical2}
                                    onChange={(e) => setSelectedChemical2(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                                >
                                    <option value="">Pilih bahan kimia...</option>
                                    {chemicals.map((chem, i) => (
                                        <option key={i} value={chem.name} className="bg-zinc-900">
                                            {chem.name} ({chem.formula})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckCompatibility}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/25"
                        >
                            🔍 Cek Kompatibilitas
                        </button>

                        {checkResult && (
                            <div
                                className={`mt-6 p-4 rounded-xl ${checkResult.safe
                                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                                    }`}
                            >
                                <p className="font-medium">{checkResult.message}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Fitur Utama</h2>
                        <p className="text-zinc-400 max-w-xl mx-auto">
                            Teknologi blockchain memastikan keamanan dan transparansi dalam setiap transaksi peringatan
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <ShieldIcon />,
                                title: "Deteksi Bahaya Real-time",
                                description: "Algoritma cerdas mendeteksi kombinasi bahan kimia berbahaya secara instan",
                                color: "from-blue-500 to-cyan-500",
                            },
                            {
                                icon: <NFTIcon />,
                                title: "Sertifikat NFT",
                                description: "Dapatkan sertifikat keamanan rumah tangga dalam bentuk NFT yang tidak dapat dipalsukan",
                                color: "from-purple-500 to-pink-500",
                            },
                            {
                                icon: <BlockchainIcon />,
                                title: "Rekam Blockchain",
                                description: "Setiap pengecekan tercatat di blockchain untuk transparansi dan audit trail",
                                color: "from-emerald-500 to-teal-500",
                            },
                            {
                                icon: <AlertIcon />,
                                title: "Peringatan Instan",
                                description: "Notifikasi langsung saat mendeteksi potensi bahaya pencampuran",
                                color: "from-red-500 to-orange-500",
                            },
                            {
                                icon: <HistoryIcon />,
                                title: "Riwayat Pengecekan",
                                description: "Akses riwayat semua pengecekan yang pernah dilakukan dengan mudah",
                                color: "from-amber-500 to-yellow-500",
                            },
                            {
                                icon: <FlaskIcon />,
                                title: "Database Lengkap",
                                description: "Database 150+ bahan kimia rumah tangga dengan informasi keamanan detail",
                                color: "from-indigo-500 to-violet-500",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="glass-card p-6 group hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-zinc-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* NFT Certificate Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="glass-card p-8 lg:p-12 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm mb-4">
                                    <NFTIcon />
                                    NFT Certificate
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Dapatkan Sertifikat Keamanan NFT
                                </h2>
                                <p className="text-zinc-400 mb-6">
                                    Setelah menyelesaikan kursus keamanan bahan kimia, Anda akan menerima sertifikat
                                    dalam bentuk NFT yang tersimpan di blockchain Polygon. Sertifikat ini membuktikan
                                    pemahaman Anda tentang bahaya pencampuran bahan kimia.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    {[
                                        "Tidak dapat dipalsukan atau digandakan",
                                        "Tersimpan permanen di blockchain",
                                        "Dapat diverifikasi oleh siapapun",
                                        "Bukti keahlian yang terdesentralisasi",
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-zinc-300">
                                            <span className="h-2 w-2 rounded-full bg-purple-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25">
                                    Mulai Kursus Sekarang
                                </button>
                            </div>
                            <div className="relative">
                                <div className="glass-card p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
                                    <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-600/40 to-pink-600/40 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
                                        <div className="text-center z-10">
                                            <div className="text-6xl mb-4">🏆</div>
                                            <h3 className="text-xl font-bold text-white mb-2">ChemSafe Certificate</h3>
                                            <p className="text-purple-300 text-sm">Verified Safety Expert</p>
                                            <div className="mt-4 px-4 py-2 rounded-lg bg-white/10 text-xs text-zinc-400 font-mono">
                                                {shortAddress}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-sm font-semibold text-white">
                                    Coming Soon
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Chemical List Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Database Bahan Kimia</h2>
                        <p className="text-zinc-400">Daftar bahan kimia rumah tangga yang tersedia dalam sistem</p>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Nama Bahan</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Formula</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-300">Tingkat Bahaya</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chemicals.map((chem, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4 text-white font-medium">{chem.name}</td>
                                        <td className="px-6 py-4 text-zinc-400 font-mono">{chem.formula}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${chem.danger === "high"
                                                        ? "bg-red-500/20 text-red-400"
                                                        : chem.danger === "medium"
                                                            ? "bg-amber-500/20 text-amber-400"
                                                            : "bg-emerald-500/20 text-emerald-400"
                                                    }`}
                                            >
                                                {chem.danger === "high" ? "Tinggi" : chem.danger === "medium" ? "Sedang" : "Rendah"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600">
                            <FlaskIcon />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                            ChemSafe
                        </span>
                    </div>
                    <p className="text-zinc-500 text-sm mb-4">
                        Sistem Peringatan Dini Bahaya Pencampuran Bahan Kimia Rumah Tangga
                    </p>
                    <p className="text-zinc-600 text-xs">
                        Powered by Polygon Blockchain • Built with ❤️ for Safety
                    </p>
                </div>
            </footer>
        </div>
    );
}
