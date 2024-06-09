import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { headerData } from "src/constants";
import { useAccount } from "wagmi";
import Connect from "../Connect";
import Disconnect from "../Disconnect";
import WalletInfo from "../WalletInfo";

const Header = () => {
  const { address: walletAddress } = useAccount();
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);
  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      p="8px"
      alignItems="center"
      h="60px"
      color="#EDEEF4"
      bg="#191B2A"
    >
      <Flex gap="96px">
        <Flex gap="8px" alignItems="center">
          <Image width="24" height="24" alt="rage" src="/assets/rage.svg" />
          <Text fontSize="14px" lineHeight="20px" fontWeight="700">
            RAGE TRADE
          </Text>
        </Flex>

        <Flex gap="24px" alignItems="center">
          {headerData.map((data, index: number) => {
            return (
              <Flex
                gap="4px"
                key={data.title}
                cursor={data.isClickable ? "pointer" : "not-allowed"}
              >
                {data.iconUrl && (
                  <Image width="16" height="16" alt="icon" src={data.iconUrl} />
                )}
                <Text
                  fontSize="12px"
                  lineHeight="18px"
                  fontWeight="600"
                  color={selectedTabIndex === index ? "#8F7DF8" : "inherit"}
                >
                  {data.title}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      {!walletAddress ? (
        <Connect />
      ) : (
        <Flex gap="8px">
          <WalletInfo />
          <Disconnect />
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
