import { Flex, Text } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import { TableDataType } from "src/constants";
import { chainIconMapping, coinsIconMapping, formatNumber } from "src/utils";

import { Connector } from "wagmi";

import TransferAsset from "./TransferAsset";

const getImage = (source?: string, connector?: Connector) => {
  if (source) {
    return "/assets/chains/hliquid.svg";
  } else if (connector && connector.icon) {
    return connector.icon;
  }
  return "/assets/chains/metamask.svg";
};

export const getColumns = (
  tableData: Array<TableDataType>,
  connector: Connector | undefined
) => {
  const columnHelper = createColumnHelper<TableDataType>();
  const columns = [
    columnHelper.accessor("wallet", {
      cell: (info) => {
        return (
          <Flex gap="6px">
            <Image
              height={24}
              width={24}
              alt="wallet"
              src={getImage(info.row.original.source, connector)}
            />
            <Text
              fontWeight="600"
              fontSize="12px"
              lineHeight="28px"
              color="#9195BB"
            >
              {info.getValue()}
            </Text>
          </Flex>
        );
      },
      header: "Wallet",
      enableSorting: false,
      meta: {
        width: "15%",
      },
    }),
    columnHelper.accessor("perc", {
      cell: (info) => {
        return (
          <Text
            fontWeight="600"
            fontSize="12px"
            lineHeight="18px"
            color="#9195BB"
          >
            {`${formatNumber(info.getValue(), false, 2)}%`}
          </Text>
        );
      },
      header: "100%",
      enableSorting: true,
      meta: {
        width: "20%",
      },
    }),
    columnHelper.accessor("chainId", {
      cell: (info) => {
        const val = info.getValue();
        return (
          <>
            {val ? (
              <Image
                height={24}
                width={24}
                alt="wallet"
                src={chainIconMapping[val] || "/assets/chains/arbitrum.svg"}
              />
            ) : null}
          </>
        );
      },
      header: "Chain",
      enableSorting: false,
      meta: {
        width: "10%",
      },
    }),
    columnHelper.accessor("symbol", {
      cell: (info) => {
        return (
          <Flex gap="6px" alignItems="center">
            <Image
              height={24}
              width={24}
              alt="wallet"
              src={coinsIconMapping[info.getValue()]}
              className="coinIcon"
            />
            <Text
              fontWeight="600"
              fontSize="12px"
              lineHeight="28px"
              color="#9195BB"
            >
              {info.getValue()}
            </Text>
          </Flex>
        );
      },
      header: "Asset",
      enableSorting: false,
      meta: {
        width: "20%",
      },
    }),
    columnHelper.accessor("marketValue", {
      cell: (info) => {
        return (
          <Flex
            flexDir="column"
            fontWeight="600"
            fontSize="12px"
            lineHeight="18px"
          >
            <Text color="white">{`${formatNumber(
              info.row.original.balance,
              false
            )} ${info.row.original.symbol}`}</Text>
            <Text color="#9195BB">{`$${formatNumber(
              info.row.original.marketValue,
              false
            )}`}</Text>
          </Flex>
        );
      },
      header: "Balance",
      enableSorting: true,
      meta: {
        width: "15%",
      },
    }),
    columnHelper.accessor("address", {
      cell: (info: any) => {
        return (
          <TransferAsset
            balance={info.row.original.balance}
            tokenAddress={info.row.original.address}
            decimals={info.row.original.decimals}
            isNative={info.row.original.isNative as boolean}
            txChainId={info.row.original.chainId}
          />
        );
      },
      header: "Transfer",
      enableSorting: false,
      meta: {
        width: "10%",
        isNumeric: true,
      },
    }),
  ];
  return columns;
};
