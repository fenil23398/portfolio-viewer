import { useEffect, useState } from "react";
import { useIdle } from "react-use";
import { fetchPrices } from "src/app/services";
import { eth, usdc, usdt, wBTC, link, uni, arb, weth } from "src/config";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";

type prices = {
  [key: string]: string;
};

// Sould be empty but fixing to default value as Coingecko APIs failing
const initialData: prices = {
  [usdt]: "1",
  [usdc]: "1.001",
  [wBTC]: "69918",
  [eth]: "3697.54",
  [link]: "16.1",
  [uni]: "10.42",
  [arb]: "0.977205",
};

const POLLING_INTERVAL = 50000;

const usePrices = () => {
  const [prices, setPrices] = useState<typeof initialData | undefined>(
    initialData
  );
  const isIdle = useIdle(150e3);
  const { address: walletAddress } = useAccount();

  const { data: priceData } = useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const r = await fetchPrices();
      return r.data;
    },
    enabled: !isIdle && walletAddress !== undefined,
    refetchInterval: POLLING_INTERVAL,
  });

  useEffect(() => {
    priceData &&
      setPrices({
        [usdt]: priceData["tether"].usd,
        [usdc]: priceData["usd-coin"].usd,
        [wBTC]: priceData["wrapped-bitcoin"].usd,
        [eth]: priceData["ethereum"].usd,
        [link]: priceData["chainlink"].usd,
        [uni]: priceData["uniswap"].usd,
        [arb]: priceData["arbitrum"].usd,
        [weth]: priceData["ethereum"].usd,
      });
  }, [priceData]);

  return prices || initialData;
};

export default usePrices;
