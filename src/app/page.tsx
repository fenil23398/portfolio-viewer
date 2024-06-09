"use client";
import { Center, ChakraProvider, Flex } from "@chakra-ui/react";

import { getCustomTheme } from "src/theme";
import WagmiProvider from "../services/WagmiProvier";
import "@rainbow-me/rainbowkit/styles.css";

import Header from "src/components/Header";
import Sidebar from "src/components/Sidebar";
import PortfolioContainer from "src/components/PortfolioContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <ChakraProvider theme={getCustomTheme()}>
      <WagmiProvider>
        <Center flexDir="column">
          <Header />
          <ToastContainer />
          <Flex height="calc(100vh - 60px)" w="100%">
            <Sidebar />
            <PortfolioContainer />
          </Flex>
        </Center>
      </WagmiProvider>
    </ChakraProvider>
  );
}
