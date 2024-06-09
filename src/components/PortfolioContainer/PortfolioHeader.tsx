import { Button, Center, Flex, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import Image from "next/image";
import {
  chainIconMapping,
  chainNameMapping,
  IIndexableNumber,
} from "src/utils";
import { useMemo } from "react";
import BalanceDetail from "../BalanceDetail";
import useDappConfig from "src/hooks/useDappConfig";

interface PortfolioHeaderProps {
  balanceChainsData: IIndexableNumber;
  userBalance: number;
}

const PortfolioHeader = ({
  balanceChainsData,
  userBalance,
}: PortfolioHeaderProps) => {
  const { address: walletAddress, connector } = useAccount();
  const { supportedChains } = useDappConfig();

  const balanceTotalDetails = useMemo(() => {
    if (
      walletAddress &&
      connector &&
      Object.keys(balanceChainsData).length > 0
    ) {
      let totalBalanceWallet = 0;

      const data = Object.keys(balanceChainsData).map((key) => {
        if (supportedChains.includes(key)) {
          totalBalanceWallet += balanceChainsData[key];
        }

        return {
          title: chainNameMapping[key],
          balance: balanceChainsData[key],
          imgKey: chainIconMapping[key],
        };
      });

      data.unshift({
        title: connector.name,
        balance: totalBalanceWallet,
        imgKey: connector.icon || "/assets/chains/metamask.svg",
      });

      data.unshift({
        title: "Balance",
        balance: userBalance,
        imgKey: "/assets/user.svg",
      });
      return data;
    }
    return [];
  }, [balanceChainsData]);

  return (
    <Flex w="100%" p="12px" pl="32px" alignItems="center" gap="12px">
      {!walletAddress ? (
        <Button
          h="36px"
          p="8px"
          bg="#26293F"
          border="1px solid"
          borderColor="#26293F"
          borderRadius="4px"
        >
          <Center gap="8px" flexDir="row">
            <Image
              src="/assets/wallet.svg"
              height="14"
              width="16"
              alt="wallet"
            />
            <Text
              color="#EDEEF4"
              fontWeight="600"
              fontSize="12px"
              lineHeight="28px"
            >
              Balance -
            </Text>
          </Center>
        </Button>
      ) : (
        <>
          {balanceTotalDetails.map((data) => {
            return <BalanceDetail {...data} key={data.title} />;
          })}
        </>
      )}
    </Flex>
  );
};

export default PortfolioHeader;
