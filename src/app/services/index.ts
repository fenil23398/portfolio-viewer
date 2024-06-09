import axios from "axios";

export const fetchHyperLiquidSpotBalance = (address: string) => {
  return axios.post(`https://api.hyperliquid.xyz/info`, {
    type: "spotClearinghouseState",
    user: address,
  });
};
