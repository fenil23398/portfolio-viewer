import { useMemo, useState } from "react";

import { TokenBalances } from "src/constants";
import {
  formatNumber,
  IIndexableNumber,
  toFixedWithoutRounding,
} from "src/utils";
import { formatUnits } from "viem";
import { arbitrum, optimism } from "viem/chains";
import useDappConfig from "./useDappConfig";
import useHyperLiquidBalance from "./useHyperLiquidBalance";
import usePrices from "./usePrices";
import useTokenBalance from "./useTokenBalance";
import { useAccount } from "wagmi";

const useBalanceHook = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const hyperLiquidBalances = useHyperLiquidBalance();

  const { tokensList, supportedTokens } = useDappConfig();
  const { tokensBalances, nativeARBBalance, nativeOPBalance } =
    useTokenBalance();

  const { connector: activeConnector } = useAccount();

  const prices = usePrices();

  const balances: Array<TokenBalances> = useMemo(() => {
    const balanceData: Array<TokenBalances> = tokensBalances
      ? tokensBalances.map((res: any, index: number) => {
          const balance = res.result! as unknown as bigint;

          const normalizedBalance = +toFixedWithoutRounding(
            balance ? formatUnits(balance, tokensList[index].decimals) : "0",
            8
          );
          return {
            ...tokensList[index],
            balance: normalizedBalance,
            source: "",
          };
        })
      : [];

    if (nativeOPBalance) {
      balanceData.push({
        chainId: optimism.id.toString(),
        ...supportedTokens[optimism.id].nativeToken,
        isNative: true,
        source: "",
        balance: +toFixedWithoutRounding(nativeOPBalance?.formatted || "0", 8),
      });
    }

    if (nativeARBBalance) {
      balanceData.push({
        chainId: arbitrum.id.toString(),
        ...supportedTokens[arbitrum.id].nativeToken,
        isNative: true,
        source: "",
        balance: +toFixedWithoutRounding(nativeARBBalance?.formatted || "0", 8),
      });
    }

    if (hyperLiquidBalances?.length > 0) {
      hyperLiquidBalances.forEach((data) => {
        balanceData.push({
          balance: Number(data.total),
          symbol: data.coin,
          source: "hyperliquid",
          chainId: "hyperliquid",
        });
      });
    }
    return balanceData;
  }, [tokensBalances, nativeARBBalance, nativeOPBalance, hyperLiquidBalances]);

  const balanceNormalizedData = useMemo(() => {
    if (balances?.length > 0 && prices) {
      let totalMarketValue = 0;
      const balanceDetails = balances
        .filter((data) => data.balance > 0)
        .map((data) => {
          const mValue = data.balance * Number(prices[data.symbol]);
          totalMarketValue += mValue;
          return {
            ...data,
            wallet: data.source
              ? data.source
              : activeConnector
              ? activeConnector.name
              : "",
            marketValue: mValue,
          };
        });
      setTotalBalance(totalMarketValue);
      return balanceDetails.map((data) => {
        const perc = (data.marketValue * 100) / totalMarketValue;
        return {
          ...data,
          perc,
        };
      });
    }
    return [];
  }, [balances, prices]);

  const balanceByChains = useMemo(() => {
    const chainsBalance: IIndexableNumber = {};
    if (balanceNormalizedData && balanceNormalizedData?.length > 0) {
      balanceNormalizedData.forEach((data) => {
        if (data.chainId) {
          if (!chainsBalance[data.chainId]) {
            chainsBalance[data.chainId] = 0;
          }
          chainsBalance[data.chainId] += data.marketValue;
        } else if (data.source) {
          if (!chainsBalance[data.source]) {
            chainsBalance[data.source] = 0;
          }
          chainsBalance[data.source] += data.marketValue;
        }
      });
    }
    return chainsBalance;
  }, [balanceNormalizedData]);

  return {
    balanceNormalizedData,
    balanceByChains,
    totalBalance,
  };
};

export default useBalanceHook;
