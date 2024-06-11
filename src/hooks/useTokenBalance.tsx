import { useIdle } from "react-use";

import { erc20Abi } from "viem";
import { arbitrum, optimism } from "viem/chains";
import { useAccount, useBalance, useReadContracts } from "wagmi";
import useDappConfig from "./useDappConfig";

const useTokenBalance = () => {
  const isIdle = useIdle(150e3);
  const { address: walletAddress } = useAccount();

  const { tokensList } = useDappConfig();

  const { data: tokensBalances } = useReadContracts({
    contracts: tokensList
      .filter((token) => !token.isNative)
      .map((token) => {
        return {
          abi: erc20Abi,
          address: token.address,
          functionName: "balanceOf",
          args: [walletAddress],
          chainId: token.chainId as unknown as number,
        };
      }),
    query: {
      enabled: !isIdle && !!walletAddress,
      refetchInterval: 1_0000,
    },
  });

  const { data: nativeARBBalance } = useBalance({
    address: walletAddress,
    chainId: arbitrum.id,
    query: {
      enabled: !isIdle && !!walletAddress,
      refetchInterval: 1_0000,
      initialData: {
        decimals: 18,
        formatted: "0",
        symbol: "ETH",
        value: 0n,
      },
    },
  });

  const { data: nativeOPBalance } = useBalance({
    address: walletAddress,
    chainId: optimism.id,
    query: {
      enabled: !isIdle && !!walletAddress,
      refetchInterval: 1_0000,
      initialData: {
        decimals: 18,
        formatted: "0",
        symbol: "ETH",
        value: 0n,
      },
    },
  });

  return {
    tokensBalances,
    nativeOPBalance,
    nativeARBBalance,
  };
};

export default useTokenBalance;
