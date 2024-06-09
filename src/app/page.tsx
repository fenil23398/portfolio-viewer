"use client";
import { ChakraProvider } from "@chakra-ui/react";

import { getCustomTheme } from "src/theme";
import WagmiProvider from "../services/WagmiProvier";
import "@rainbow-me/rainbowkit/styles.css";

import "react-toastify/dist/ReactToastify.css";
import PageLayout from "src/components/PageLayout";

export default function Home() {
  return (
    <ChakraProvider theme={getCustomTheme()}>
      <WagmiProvider>
        <PageLayout />
      </WagmiProvider>
    </ChakraProvider>
  );
}
