import axios from "axios";
import { useEffect, useState } from "react";
import { useIdle, useInterval } from "react-use";
import { eth, usdc, usdt, wBTC, link, uni, arb } from "src/config";
import { useAccount } from "wagmi";

type prices = {
  [key: string]: string;
};

const initialData: prices = {
  [usdt]: "",
  [usdc]: "",
  [wBTC]: "",
  [eth]: "",
  [link]: "",
};

const POLLING_INTERVAL = 20000;

const usePrices = () => {
  const [prices, setPrices] = useState<typeof initialData | undefined>(
    undefined
  );
  const isIdle = useIdle(150e3);
  const { address: walletAddress } = useAccount();

  const getPrices = async () => {
    try {
      const data = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,tether,wrapped-bitcoin,ethereum,chainlink,uniswap,arbitrum&vs_currencies=usd"
      );
      const priceData = data?.data;
      priceData &&
        setPrices({
          [usdt]: priceData["tether"].usd,
          [usdc]: priceData["usd-coin"].usd,
          [wBTC]: priceData["wrapped-bitcoin"].usd,
          [eth]: priceData["ethereum"].usd,
          [link]: priceData["chainlink"].usd,
          [uni]: priceData["uniswap"].usd,
          [arb]: priceData["arbitrum"].usd,
        });
    } catch (error) {
      console.log("Price API Error", error);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      getPrices();
    }
  }, [walletAddress]);

  useInterval(() => {
    if (!isIdle && walletAddress) {
      getPrices();
    }
  }, POLLING_INTERVAL);

  return prices;
};

export default usePrices;
