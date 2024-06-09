import { useMemo } from "react";
import { getColumns } from "./helpers";

import React from "react";
import { useAccount } from "wagmi";

import TableData from "./Table";
import { TableDataType } from "src/constants";

interface PortfolioDistribution {
  balanceData: Array<TableDataType>;
}

const PortfolioDistribution = ({ balanceData }: PortfolioDistribution) => {
  const { connector: activeConnector } = useAccount();

  const columns = useMemo(() => {
    return getColumns(balanceData, activeConnector);
  }, [activeConnector]);

  return (
    <TableData data={activeConnector ? balanceData : []} columns={columns} />
  );
};

export default PortfolioDistribution;
