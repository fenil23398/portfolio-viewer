import { Hash } from "viem";

export type SiebarSubMenuType = {
  title: string;
  isComingSoon?: boolean;
  path?: string;
};

export type MenuData = {
  title: string;
  iconUrl?: string;
};

export type HeaderData = MenuData & {
  isClickable?: boolean;
};

export interface SiebarMenuType extends MenuData {
  children: SiebarSubMenuType[];
}

export const sidebarData: SiebarMenuType[] = [
  {
    title: "Account",
    iconUrl: "/assets/account.svg",
    children: [
      {
        title: "Overview",
        path: "/",
      },
      {
        title: "Rewards",
        isComingSoon: true,
      },
      {
        title: "Deposit",
        isComingSoon: true,
      },
      {
        title: "Withdraw",
        isComingSoon: true,
      },
      {
        title: "Transfer",
        isComingSoon: true,
      },
      {
        title: "History",
        isComingSoon: true,
      },
    ],
  },
];

export const headerData: HeaderData[] = [
  {
    title: "Trade",
  },
  {
    title: "Account",
    iconUrl: "/assets/account.svg",
    isClickable: true,
  },
  {
    title: "Competitions",
  },
  {
    title: "Stats",
  },
];

export type TokenBalances = {
  symbol: string;
  decimals?: number;
  address?: Hash;
  chainId?: string;
  balance: number;
  source?: string;
  isNative?: boolean;
};

export type TableDataType = {
  marketValue: number;
  symbol: string;
  decimals?: number;
  address?: `0x${string}`;
  chainId?: string;
  balance: number;
  wallet: string;
  perc: number;
  isNative?: boolean;
  source?: string;
};

export type HyperLiquidBalanceType = {
  coin: string;
  total: string;
};

export const MAX_FRACTION_DIGITS = 4;
