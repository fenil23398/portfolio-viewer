import { Button, Center, Text } from "@chakra-ui/react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const Connect = () => {
  const { openConnectModal } = useConnectModal();

  const onConnectClick = () => {
    openConnectModal?.();
  };

  return (
    <>
      <Button
        variant="unstyled"
        w="114px"
        h="36px"
        p="8px"
        bg="#1F2133"
        borderRadius="4px"
        border="1px solid"
        borderColor="#26293F"
        onClick={onConnectClick}
      >
        <Center gap="8px" flexDir="row">
          <Image src="/assets/wallet.svg" height="14" width="16" alt="wallet" />
          <Text
            color="#EDEEF4"
            fontWeight="600"
            fontSize="12px"
            lineHeight="28px"
          >
            Connect
          </Text>
        </Center>
      </Button>
    </>
  );
};

export default Connect;
