import * as React from "react"
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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"


const data: Payment[] = [
    {
        id: "m5gr84i9",
        amount: 31600000,
        status: "draft",
        customer_name: "Yah",
        credit_id: "00530241000023",
        date: "-"
    },
    {
        id: "3u1reuv4",
        amount: 24200000,
        status: "draft",
        customer_name: "Ya Isya",
        credit_id: "00530241000024",
        date: "-"
    },
    {
        id: "derv1ws0",
        amount: 83700000,
        status: "rfa",
        customer_name: "Nab Garam",
        credit_id: "00530241000026",
        date: "-"
    },
    {
        id: "5kma53ae",
        amount: 87400000,
        status: "draft",
        customer_name: "Madu Uyah",
        credit_id: "00530241000027",
        date: "-"
    },
    {
        id: "bhqecj4p",
        amount: 72100000,
        status: "rejected",
        customer_name: "Carmelle",
        credit_id: "00530241000028",
        date: "-"
    },
]

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed" | "draft" | "rfa" | 'rejected'
    customer_name: string
    credit_id: string
    date: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        id: "select",
        // header: ({ table }) => (
        //     <Checkbox
        //         checked={
        //             table.getIsAllPageRowsSelected() ||
        //             (table.getIsSomePageRowsSelected() && "indeterminate")
        //         }
        //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        //         aria-label="Select all"
        //     />
        // ),
        // cell: ({ row }) => (
        //     <Checkbox
        //         checked={row.getIsSelected()}
        //         onCheckedChange={(value) => row.toggleSelected(!!value)}
        //         aria-label="Select row"
        //     />
        // ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "credit_id",
        header: "Credit ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("credit_id")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant="secondary">{row.getValue("status")}</Badge>
        ),
    },
    {
        accessorKey: "customer_name",
        header: ({ column }) => {
            return (
                <div
                    // variant="ghost"
                    className="flex flex-row gap-2 hover:cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Customer Name
                    <ArrowUpDown size={18} />
                </div>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("customer_name")}</div>,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-ID", {
                style: "currency",
                currency: "IDR",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "date",
        header: "Approve NPP Date",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("date")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Print
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function ListDataCusomerVerification() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

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
    })

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between">
                <div className="flex flex-col md:flex-row md:flex-start gap-4">
                    <div>
                        <Input
                            placeholder="Filter by credit id"
                            value={(table.getColumn("credit_id")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("credit_id")?.setFilterValue(event.target.value)
                            }
                        />
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="w-full md:w-auto">
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
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
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div>
                    <Button className="ml-auto w-full md:w-auto">
                        Add Customer Verification
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="whitespace-nowrap">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
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
                                                cell.getContext()
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
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2 flex flex-row gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
