import {
  Button,
  Center,
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { toast } from "react-toastify";
import { shortenAddress, copyToClipboard, formatNumber } from "src/utils";
import { useDisconnect, useAccount } from "wagmi";
import useBalanceHook from "src/hooks/useBalance";

const WalletInfo = () => {
  const { disconnect } = useDisconnect();

  const { address: walletAddress, connector: activeConnector } = useAccount();

  const { totalBalance } = useBalanceHook();

  const walletIcon =
    activeConnector && activeConnector.icon
      ? activeConnector.icon
      : "/assets/chains/metamask.svg";

  return (
    // <Flex gap="8px">
    <>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button
            minW="114px"
            p="8px"
            h="36px"
            bg="#1F2133"
            borderRadius="4px"
            border="1px solid"
            borderColor="#26293F"
          >
            <Center
              gap="8px"
              flexDir="row"
              w="100%"
              justifyContent="flex-start"
            >
              <Image
                src="/assets/user.svg"
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
                {formatNumber(totalBalance, false, 2)}
              </Text>
            </Center>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          w="160px"
          p="8px"
          bg="#26293F"
          border="1px solid"
          borderColor="#26293F"
          borderRadius="4px"
        >
          <Flex flexDir="column" gap="8px">
            <Flex alignItems="center" flexDir="row" gap="8px">
              <Image src={walletIcon} width="24" height="20" alt="wallet" />
              <Text
                color="#A5A9C8"
                fontSize="12px"
                lineHeight="14px"
                fontWeight="500"
              >
                {shortenAddress(walletAddress as string, 6, 4)}
              </Text>

              <Box
                onClick={() => {
                  copyToClipboard(walletAddress);
                  toast.success("Copied!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: "light",
                  });
                }}
              >
                <Image
                  height="16"
                  width="16"
                  alt="copy"
                  src="/assets/copy.svg"
                />
              </Box>
            </Flex>
            <Button
              bg="#333653"
              borderRadius="4px"
              border="1px solid"
              p="8px"
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </Flex>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default WalletInfo;
