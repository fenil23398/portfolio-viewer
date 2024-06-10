import { Center, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAccount } from "wagmi";
import Header from "../Header";
import PortfolioContainer from "../PortfolioContainer";

import Sidebar from "../Sidebar";

const PageLayout = () => {
  const { isConnecting } = useAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isConnecting) {
      setLoading(false);
    }
  }, [isConnecting]);

  return (
    <Center flexDir="column">
      <ToastContainer />
      {loading ? (
        <Center h="100vh">
          <Spinner color="#1F2133" width="2rem" height="2rem" />
        </Center>
      ) : (
        <>
          <Header />
          <Flex height="calc(100vh - 60px)" w="100%">
            <Sidebar />
            <PortfolioContainer />
          </Flex>
        </>
      )}
    </Center>
  );
};

export default PageLayout;
