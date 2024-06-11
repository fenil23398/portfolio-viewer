import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Flex,
  Input,
  PopoverArrow,
  PopoverBody,
  useDisclosure,
  useOutsideClick,
  Box,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { erc20Abi, Hash, parseEther, parseUnits, Address } from "viem";
import {
  useSendTransaction,
  useChainId,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { toast } from "react-toastify";
import {
  isErrorRejectedByUser,
  isNumber,
  isValidEthereumAddress,
} from "src/utils";
import { MAX_FRACTION_DIGITS } from "src/constants";

interface TransferAssetProps {
  balance: number;
  tokenAddress?: Hash | undefined;
  decimals?: number | undefined;
  isNative: boolean;
  txChainId?: string | undefined;
}

const TransferAsset = ({
  balance,
  tokenAddress,
  decimals,
  isNative,
  txChainId,
}: TransferAssetProps) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const { sendTransaction } = useSendTransaction();
  const { writeContract } = useWriteContract();

  const { isOpen, onToggle, onClose } = useDisclosure();
  const popoverRef = useRef(null);
  useOutsideClick({
    ref: popoverRef,
    handler: onClose,
  });
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const handleChange = (value: string) => {
    const val = value.trim().replace(/,/g, "");
    if (isNumber(val) || val === "") {
      if (val.indexOf(".") === -1) {
        setAmount(val);
      } else {
        if (val.length - (val.indexOf(".") + 1) <= MAX_FRACTION_DIGITS) {
          setAmount(val === "." ? "0." : val);
        }
      }
    }
  };

  const showError = (error: string) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
    });
  };

  const onTransfer = async () => {
    if (!walletAddress || !amount) {
      showError("Enter valid Input");
      return;
    }

    if (!isValidEthereumAddress(walletAddress)) {
      showError("Enter valid wallet address");
      return;
    }

    if (Number(amount) > balance) {
      showError("Amount exceeds balance");
      return;
    }

    if (chainId !== Number(txChainId)) {
      switchChain({ chainId: Number(txChainId) });
    }

    if (!tokenAddress || !txChainId || !decimals) {
      return;
    }

    try {
      if (isNative) {
        sendTransaction(
          {
            to: walletAddress as Address,
            value: parseEther(amount),
          },
          {
            onError(error: any) {
              showError(
                isErrorRejectedByUser(error)
                  ? "Rejected by user"
                  : error?.message ?? "Transaction Failed"
              );

              onToggle();
            },
            onSuccess(data) {
              toast.success(`Transaction Successful ${data}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
              });
              onToggle();
            },
          }
        );
      } else {
        console.log("***** Here ");
        writeContract(
          {
            address: tokenAddress,
            abi: erc20Abi,
            functionName: "transfer",
            args: [walletAddress as Hash, parseUnits(amount, decimals ?? 18)],
          },
          {
            onError(error: any) {
              showError(
                isErrorRejectedByUser(error)
                  ? "Rejected by user"
                  : error?.message ?? "Transaction Failed"
              );
              onToggle();
            },
            onSuccess(data: string) {
              toast.success(`Transaction Successful ${data}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: "light",
              });
              onToggle();
            },
          }
        );
      }
    } catch (error: any) {
      showError(error?.message ?? "Transaction Failed");
      onToggle();
      return;
    }
  };

  return (
    <>
      {txChainId && decimals && tokenAddress ? (
        <Box ref={popoverRef}>
          <Popover
            placement="left"
            closeOnBlur={true}
            autoFocus={true}
            isOpen={isOpen}
          >
            <PopoverTrigger>
              <Button
                p="8px"
                fontWeight="600"
                fontSize="12px"
                lineHeight="28px"
                color="#8F7DF8"
                bg="transperent"
                onClick={onToggle}
                isDisabled={!txChainId}
              >
                Transfer
              </Button>
            </PopoverTrigger>
            <PopoverContent
              w="220px"
              p="8px"
              bg="#26293F"
              border="1px solid"
              borderColor="#26293F"
              borderRadius="4px"
            >
              <PopoverBody>
                <PopoverArrow />
                <Flex flexDir="column" gap="8px">
                  <Input
                    type="text"
                    variant="unstyled"
                    placeholder="Enter Amount"
                    borderRadius="4px"
                    p="4px"
                    h="36px"
                    fontWeight="600"
                    fontSize="12px"
                    lineHeight="18px"
                    w="204px"
                    color="darkslategrey"
                    value={amount}
                    //   isInvalid={!!error}
                    onChange={(e) => handleChange(e.target.value)}
                    //   borderColor={error ? "error" : "inherit"}

                    //   disabled={disabled}
                  />

                  <Input
                    type="text"
                    variant="unstyled"
                    placeholder="Wallet address"
                    borderRadius="4px"
                    p="4px"
                    h="36px"
                    fontWeight="600"
                    fontSize="12px"
                    lineHeight="18px"
                    w="204px"
                    color="darkslategrey"
                    value={walletAddress}
                    //   isInvalid={!!error}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    //   borderColor={error ? "error" : "inherit"}

                    //   disabled={disabled}
                  />

                  <Button
                    bg="#333653"
                    borderRadius="4px"
                    p="8px"
                    height="36px"
                    color="#EDEEF4"
                    fontWeight="500"
                    fontSize="12px"
                    onClick={() => onTransfer()}
                  >
                    Send
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      ) : null}
    </>
  );
};

export default TransferAsset;
