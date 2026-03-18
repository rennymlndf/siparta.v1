import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { polygonAmoy } from "thirdweb/chains";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";

const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
});

const wallets = [
    createWallet("io.metamask"),
];

export default function MetaMaskAuth() {
    const router = useRouter();
    const account = useActiveAccount();

    useEffect(() => {
        if (account) {
            router.push("/dashboard");
        }
    }, [account, router]);

    return (
        <div className="flex flex-col items-center gap-4">
            <ConnectButton
                client={client}
                wallets={wallets}
                chain={polygonAmoy}
                connectButton={{
                    label: "🦊 Connect MetaMask",
                    className: "premium-button",
                }}
                appMetadata={{
                    name: "ChemSafe - Sistem Peringatan Bahan Kimia",
                    url: "https://chemsafe.example.com",
                }}
            />
            <p className="text-zinc-500 text-sm">
                Hubungkan wallet untuk mengakses dashboard
            </p>
        </div>
    );
}
