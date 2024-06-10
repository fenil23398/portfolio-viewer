import { Chain, Hash } from "viem";

import { arbitrum, optimism } from "viem/chains";

export type TokenDetails = {
  symbol: string;
  decimals: number;
  address: Hash;
  isNative?: boolean;
};

export type ConfigMap = {
  [x: Chain["id"]]: {
    chain: Chain;
    nativeToken: TokenDetails;
    tokens: TokenDetails[];
  };
};

export const usdt = "USDT";
export const usdc = "USDC";
export const wBTC = "WBTC";
export const link = "LINK";
export const eth = "ETH";
export const uni = "UNI";
export const arb = "ARB";
export const weth = "WETH";

export const supportedTokens: ConfigMap = {
  [optimism.id]: {
    chain: optimism,
    nativeToken: {
      symbol: eth,
      decimals: 18,
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },

    tokens: [
      {
        symbol: usdt,
        decimals: 6,
        address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      },
      {
        symbol: usdc,
        decimals: 6,
        address: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
      },
      {
        symbol: wBTC,
        decimals: 8,
        address: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
      },
      {
        symbol: link,
        decimals: 18,
        address: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6",
      },
      {
        symbol: uni,
        decimals: 18,
        address: "0x6fd9d7AD17242c41f7131d257212c54A0e816691",
      },
      {
        symbol: weth,
        decimals: 18,
        address: "0x4200000000000000000000000000000000000006",
      },
    ],
  },
  [arbitrum.id]: {
    chain: arbitrum,
    nativeToken: {
      symbol: eth,
      decimals: 18,
      address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
    },

    tokens: [
      {
        symbol: usdt,
        decimals: 6,
        address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
      },
      {
        symbol: usdc,
        decimals: 6,
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      },
      {
        symbol: wBTC,
        decimals: 8,
        address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      },
      {
        symbol: link,
        decimals: 18,
        address: "0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
      },
      {
        symbol: uni,
        decimals: 18,
        address: "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
      },
      {
        symbol: arb,
        decimals: 18,
        address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      },
      {
        symbol: weth,
        decimals: 18,
        address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
      },
    ],
  },
};
