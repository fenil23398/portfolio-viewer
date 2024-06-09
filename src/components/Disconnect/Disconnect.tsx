import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { useDisconnect } from "wagmi";

const Disconnect = () => {
  const { disconnect } = useDisconnect();
  return (
    <Button
      w="36px"
      h="36px"
      bg="#26293F"
      border="1px solid"
      borderColor="#26293F"
      borderRadius="4px"
      onClick={() => disconnect()}
    >
      <Image src="/assets/disconnect.svg" height="14" width="16" alt="wallet" />
    </Button>
  );
};

export default Disconnect;
