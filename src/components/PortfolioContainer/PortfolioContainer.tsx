import { Divider, Flex } from "@chakra-ui/react";
import useBalanceHook from "src/hooks/useBalance";

import PortfolioDistribution from "./PortfolioDistribution";
import PortfolioHeader from "./PortfolioHeader";

const PortfolioContainer = () => {
  const { balanceNormalizedData, balanceByChains, totalBalance } =
    useBalanceHook();

  return (
    <Flex w="100%" flexDir="column" bg="#1F2133">
      <PortfolioHeader
        balanceChainsData={balanceByChains}
        userBalance={totalBalance}
      />
      <Divider
        w="100%"
        borderWidth="1px"
        borderStyle="solid"
        borderColor="#26293F"
      />
      <PortfolioDistribution balanceData={balanceNormalizedData} />
    </Flex>
  );
};

export default PortfolioContainer;
