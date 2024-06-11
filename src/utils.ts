import { UserRejectedRequestError } from "viem";
import { arbitrum, optimism } from "viem/chains";
import { arb, eth, uni, usdc, usdt, wBTC, link, weth } from "./config";

export const copyToClipboard = (value: any) =>
  navigator.clipboard.writeText(value);

export const shortenAddress = (
  address: string,
  startingAddressLetters = 10,
  endingAddressLetters = 4
) => {
  let startAddressLetters = startingAddressLetters;
  let endAddressLetters = endingAddressLetters;

  if (address.length < startAddressLetters + endAddressLetters) {
    return address;
  }

  return `${address.substring(0, startAddressLetters)}...${address.substring(
    address.length - endAddressLetters
  )}`;
};

export interface IIndexable {
  [key: string]: string;
}

export interface IIndexableNumber {
  [key: string]: number;
}

export const coinsIconMapping: IIndexable = {
  [usdc]: "/assets/coins/usdc.svg",
  [usdt]: "/assets/coins/usdt.svg",
  [eth]: "/assets/coins/eth.svg",
  [wBTC]: "/assets/coins/wbtc.svg",
  [uni]: "/assets/coins/uni.svg",
  [arb]: "/assets/coins/arb.svg",
  [link]: "/assets//coins/link.svg",
  [weth]: "/assets/coins/weth.svg",
};

export const chainIconMapping: IIndexable = {
  [arbitrum.id]: "/assets/chains/arbitrum.svg",
  [optimism.id]: "/assets/chains/op.svg",
  hyperliquid: "assets/chains/hliquid.svg",
};

export const chainNameMapping: IIndexable = {
  [arbitrum.id]: "Arbitrum",
  [optimism.id]: "Optimism",
  hyperliquid: "Hyperliquid",
};

export const toFixedWithoutRounding = (value: string, decimals: number) =>
  (value.match(new RegExp(`^-?\\d+(?:.\\d{0,${decimals}})?`)) as string[])[0];

const getValue = (
  isFloor: boolean,
  isSlice: boolean,
  value: number,
  maxFractionDigits: number
) => {
  if (isFloor) {
    return Math.floor(value);
  } else if (isSlice) {
    const updatedValue = value.toString();

    if (updatedValue.indexOf(".") !== -1) {
      return Number(
        updatedValue.slice(0, updatedValue.indexOf(".") + maxFractionDigits + 1)
      );
    }
    return value;
  }
  return value;
};

export const formatNumber = (
  value: number,
  isFloor: boolean = true,
  maxFractionDigits = 4,
  isSlice: boolean = false
) => {
  const updatedValue = getValue(isFloor, isSlice, value, maxFractionDigits);
  return updatedValue.toLocaleString("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  });
};

export function isErrorRejectedByUser(error: any) {
  const errorMessage = error ? JSON.stringify(error) : "";
  const isrejectedError = [
    "metamask tx signature: user denied transaction signature.",
    "tx signature: user denied transaction signature.",
    "user rejected",
    "user rejected the transaction",
    "User canceled",
    "transaction declined",
  ].some((errMessage) => errorMessage.toLowerCase().includes(errMessage));
  return error instanceof UserRejectedRequestError || isrejectedError;
}

export const isNumber = (str: string) => {
  if (str.trim() === "") {
    return false;
  }
  return !isNaN(+str);
};

export const isValidEthereumAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
