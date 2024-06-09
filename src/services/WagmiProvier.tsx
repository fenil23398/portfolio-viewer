import { ReactNode } from "react";
import { createConfig, fallback, http, WagmiProvider } from "wagmi";
import {
  connectorsForWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { arbitrum, Chain, optimism } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  okxWallet,
  coinbaseWallet,
  metaMaskWallet,
  rabbyWallet,
  walletConnectWallet,
  bitgetWallet,
  imTokenWallet,
  ledgerWallet,
  safepalWallet,
  tokenPocketWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";

interface WagmiProviersProps {
  children: ReactNode;
}

const ALCHEMY_ARBITRUM_KEY = "veX7Dv3RnELcZyxBDrs5Ds-bdUBTr8Ua";

const WC_PROJECT_ID = "3c159dabe97c66fb7905025bb66feb9a" as string;
const queryClient = new QueryClient();

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
        okxWallet,
        trustWallet,
        rabbyWallet,
        safepalWallet,
        tokenPocketWallet,
        bitgetWallet,
        imTokenWallet,
        ledgerWallet,
      ],
    },
  ],
  {
    appName: "Portfolio Manager",
    projectId: WC_PROJECT_ID,
  }
);

type IconExtra = {
  iconUrl: string;
};

type ChainWithIcons = Chain & IconExtra;

export const supportedChains: [ChainWithIcons, ...ChainWithIcons[]] = [
  {
    ...arbitrum,
    iconUrl: "/assets/chains/arbitrum.svg",
  },
  {
    ...optimism,
    iconUrl: "/assets/chains/op.svg",
  },
];

export const wagmiConfig = createConfig({
  chains: supportedChains,
  transports: {
    [arbitrum.id]: fallback([
      http(`https://arb-mainnet.g.alchemy.com/v2/${ALCHEMY_ARBITRUM_KEY}`),
      http("https://rpc.ankr.com/arbitrum"),
    ]),

    [optimism.id]: fallback([
      http("https://mainnet.optimism.io"),
      http("https://rpc.ankr.com/optimism"),
    ]),
  },
  connectors,
});

const WagmiProvier = ({ children }: WagmiProviersProps) => {
  const defaultTheme = lightTheme({
    accentColor: "#9195BB",
    fontStack: "system",
    overlayBlur: "small",
  });

  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            appInfo={{
              appName: "Portfolio Manager",
            }}
            theme={{
              ...defaultTheme,
              colors: {
                ...defaultTheme.colors,
                modalBackground: "#1F2133",
                modalText: "#F8F8FC",
                modalTextSecondary: "#9195BB",
                closeButton: "#A5A9C8",
              },
            }}
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default WagmiProvier;
