import axios from "axios";

export const fetchHyperLiquidSpotBalance = (address: string) => {
  return axios.post(`https://api.hyperliquid.xyz/info`, {
    type: "spotClearinghouseState",
    user: address,
  });
};

export const fetchPrices = () => {
  return axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin,tether,wrapped-bitcoin,ethereum,chainlink,uniswap,arbitrum&vs_currencies=usd"
  );
};
