import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { formatNumber } from "src/utils";

interface BalanceDetailProps {
  imgKey: string;
  balance: number;
  title: string;
}

const BalanceDetail = ({ imgKey, balance, title }: BalanceDetailProps) => {
  return (
    <Flex
      flexDir="row"
      p="8px"
      gap="8px"
      bg="#26293F"
      border="1px solid"
      borderColor="#333653"
      borderRadius="4px"
      h="36px"
      key={title}
    >
      <Image src={imgKey} width="24" height="24" alt="wallet" />
      <Flex alignItems="center" flexDir="row" gap="6px">
        <Text
          color="#9195BB"
          fontSize="12px"
          lineHeight="14px"
          fontWeight="600"
        >
          {title}
        </Text>

        <Text
          color="#EDEEF4"
          fontSize="14px"
          lineHeight="28px"
          fontWeight="600"
        >
          {`$${formatNumber(balance, false, 2)}`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default BalanceDetail;
