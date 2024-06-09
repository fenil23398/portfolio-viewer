import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  Center,
  Box,
} from "@chakra-ui/react";

import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import React from "react";
import { HiArrowDown, HiArrowUp, HiArrowsUpDown } from "react-icons/hi2";
import { useAccount } from "wagmi";
import Connect from "../Connect";

const TableData = ({ data, columns }: any) => {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "perc",
      desc: true, // sort by name in descending order by default
    },
  ]);
  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const { address: walletAddress } = useAccount();

  return (
    <Box overflowY="auto" maxHeight="100%">
      <TableContainer mx="32px" className="tableContainer">
        <Table variant="simple" w="100%">
          <Thead h="48px">
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr
                key={headerGroup.id}
                fontSize="12px"
                fontWeight="600"
                lineHeight="28px"
                color="#9195BB"
              >
                {headerGroup.headers.map((header) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = header.column.columnDef.meta;
                  return (
                    <Th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      textAlign={meta?.isNumeric ? "right" : "left"}
                    >
                      {
                        <Flex
                          align="center"
                          gap="0.5rem"
                          pr={meta?.isNumeric ? "8px" : 0}
                          justifyContent={
                            meta?.isNumeric ? "flex-end" : "flex-start"
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}

                          {header.column.getCanSort() &&
                            (header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                <HiArrowDown />
                              ) : (
                                <HiArrowUp />
                              )
                            ) : (
                              <HiArrowsUpDown />
                            ))}
                        </Flex>
                      }
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody w="100%">
            {walletAddress ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <Tr
                    key={row.id}
                    _hover={{
                      bg: "#26293F",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => {
                      // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                      const meta: any = cell.column.columnDef.meta;
                      return (
                        <Td
                          key={cell.id}
                          isNumeric={meta?.isNumeric}
                          textAlign={meta?.isNumeric ? "right" : "left"}
                          width={meta.width}
                          py="8px"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}{" "}
              </>
            ) : (
              <Tr>
                <Td colSpan={6} py="32px">
                  <Center>
                    <Connect />
                  </Center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableData;
