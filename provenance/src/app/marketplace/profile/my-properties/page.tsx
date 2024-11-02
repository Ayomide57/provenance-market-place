"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { registrarContract } from "@/util";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Asset } from "@/types/property";
import { useActiveAccount } from "thirdweb/react";

const columns: ColumnDef<Asset>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "verified",
    header: "Verify Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("verified") ? "Verified" : "Not Verified"}
      </div>
    ),
  },
  {
    accessorKey: "p_owner",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Owner
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div
        onClick={() =>
          navigator.clipboard.writeText(`${row.getValue("p_owner")}`)
        }
        className="cursor-pointer px-4 lowercase"
      >
        {`${row.getValue("p_owner")}`.substr(0, 15) + " ..."}
      </div>
    ),
  },
  {
    accessorKey: "nftAddress",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Contract Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div
        onClick={() =>
          navigator.clipboard.writeText(`${row.getValue("nftAddress")}`)
        }
        className="cursor-pointer px-4 lowercase"
      >
        {`${row.getValue("nftAddress")}`.substr(0, 15) + " ..."}
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("value"));

      //Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{`${formatted}`}</div>;
    },
  },
  {
    accessorKey: "property_RegId",
    header: () => <div className="text-right">Property Registration Id</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {`${row.getValue("property_RegId")}`}{" "}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const asset = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border border-primary bg-sky-700/80 text-white backdrop-blur-xl"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(asset.id)}
            >
              Copy Token ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href={`/marketplace/product-details/${asset.id}/${asset.p_owner}`}
              >
                View asset details
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const MyProperties = () => {
  const [data, setProperties] = useState<any>([]);
const smartAccount = useActiveAccount();

    const queryRwaEvents = React.useCallback(async () => {
      //queryFilter, filters
    const events = await registrarContract.queryFilter("EventAssetVerified");
    const filterVal: Asset[] = [];
    events.map(
      (event: {
        args: {
          tokenId: any;
          p_owner: any;
          nftAddress: any;
          property_RegId: any;
          survey_zip_code: any;
          survey_number: any;
          value: any;
          verified: any;
        };
      }) => {
        return (
          event.args &&
          event.args.p_owner == smartAccount?.address &&
          filterVal.push({
            id: event.args.property_RegId,
            p_owner: event.args.p_owner,
            nftAddress: event.args.nftAddress,
            property_RegId: event.args.property_RegId,
            value: event.args.value,
            verified: event.args.verified,
          })
        );
      },
    );
    setProperties(filterVal);
  }, [smartAccount?.address]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  useEffect(() => {
    queryRwaEvents();
  }, [data, queryRwaEvents]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
      <div className="text-white ml-20" style={{ width: "-webkit-fill-available" }}>
        <div className="flex justify-between">
          <div>
            {" "}
            <h1 className="p-4 text-3xl">My Assets</h1>
          </div>
        </div>

        <div
          //className={styles.content}
          style={{ width: "-webkit-fill-available" }}
        >
          <div className="mx-auto">
            <div className="p-4">
              <h1 className="">View all my Assets</h1>
              <div className="flex items-center py-4">
                <Input
                  placeholder="Filter p_owner..."
                  value={
                    (table.getColumn("p_owner")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("p_owner")
                      ?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm border-primary"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="ml-auto rounded-sm border-primary"
                    >
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="border border-primary bg-sky-700/30 backdrop-blur-xl"
                  >
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="rounded-md border-primary">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="border-primary"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="border-primary"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MyProperties;
