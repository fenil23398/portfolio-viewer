import { useEffect, useState } from "react";
import { useIdle, useInterval } from "react-use";
import { fetchHyperLiquidSpotBalance } from "src/app/services";
import { HyperLiquidBalanceType } from "src/constants";
import { useAccount } from "wagmi";

const POLLING_INTERVAL = 10000;

const useHyperLiquidBalance = () => {
  const [balanceData, setBalanceData] = useState<HyperLiquidBalanceType[]>([]);
  const { address: walletAddress } = useAccount();
  const isIdle = useIdle(150e3);

  const getHyperLiquidBalance = async () => {
    if (walletAddress) {
      const res = await fetchHyperLiquidSpotBalance(walletAddress as string);
      setBalanceData(res?.data?.balances || []);
    }
  };

  useEffect(() => {
    if (!walletAddress) {
      setBalanceData([]);
      return;
    }
    getHyperLiquidBalance();
  }, [walletAddress]);

  useInterval(() => {
    if (!isIdle && walletAddress) {
      getHyperLiquidBalance;
    }
  }, POLLING_INTERVAL);

  return balanceData;
};

export default useHyperLiquidBalance;
