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
import { useRouter } from "next/router"


const data: MainAcquisition[] = [
    {
        id: "m5gr84i9",
        customer_name: "Agung Desianto",
        status: "draft",
        credit_id: "00530241000023",
        date: "-",
        po_days: 2,
        count_sended_email: 2,
        po_status: "",
        ro_status: "yes",
        brand_item: "BRZ Subari 2200 XV",
        dealer_name: "Subaru Mobil Karang Tengah",
        source_cas: "Mobile",
        mobile_cas_id: "11111901100348",
        po_number: "PO/MCF/00773/24/11/00002"
    },
    {
        id: "3u1reuv4",
        status: "draft",
        customer_name: "Ya Isya",
        credit_id: "00530241000024",
        date: "-",
        po_days: 4,
        count_sended_email: 5,
        po_status: "L",
        ro_status: "yes",
        brand_item: "BRZ Subari 2200 XV",
        dealer_name: "Subaru Mobil Karang Tengah",
        source_cas: "Mobile",
        mobile_cas_id: "11111901100347",
        po_number: "PO/MCF/00773/24/11/00003"
    },
    {
        id: "derv1ws0",
        status: "rfa",
        customer_name: "Nab Garam",
        credit_id: "00530241000026",
        date: "-",
        po_days: 0,
        count_sended_email: 2,
        po_status: "",
        ro_status: "yes",
        brand_item: "BRZ Subari 2200 XV",
        dealer_name: "Subaru Mobil Karang Tengah",
        source_cas: "Mobile",
        mobile_cas_id: "11111901100346",
        po_number: "PO/MCF/00773/24/11/00004"
    },
    {
        id: "5kma53ae",
        status: "draft",
        customer_name: "Madu Uyah",
        credit_id: "00530241000027",
        date: "-",
        po_days: -61,
        count_sended_email: 0,
        po_status: "",
        ro_status: "yes",
        brand_item: "BRZ Subari 2200 XV",
        dealer_name: "Subaru Mobil Karang Tengah",
        source_cas: "Mobile",
        mobile_cas_id: "11111901100345",
        po_number: ""
    },
    {
        id: "bhqecj4p",
        status: "rejected",
        customer_name: "Carmelle",
        credit_id: "00530241000028",
        date: "-",
        po_days: 15,
        count_sended_email: 0,
        po_status: "",
        ro_status: "yes",
        brand_item: "BRZ Subari 2200 XV",
        dealer_name: "Subaru Mobil Karang Tengah",
        source_cas: "Mobile",
        mobile_cas_id: "11111901100344",
        po_number: ""
    },
]

export type MainAcquisition = {
    id: string
    status?: "approve" | "draft" | "rfa" | "rejected"
    customer_name?: string
    credit_id?: string
    date?: string
    po_number?: string
    mobile_cas_id?: string
    source_cas?: string
    dealer_name?: string
    brand_item?: string
    ro_status?: "yes" | "no"
    po_status?: string
    count_sended_email?: number
    po_days?: number
}

export const columns: ColumnDef<MainAcquisition>[] = [
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
        accessorKey: "date",
        header: "CM Date",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("date")}</div>
        ),
    },
    {
        accessorKey: "po_number",
        header: "PO Number",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("po_number")}</div>
        ),
    },
    {
        accessorKey: "mobile_cas_id",
        header: "Mobile CAS ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("mobile_cas_id")}</div>
        ),
    },
    {
        accessorKey: "source_cas",
        header: "Source CAS",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("source_cas")}</div>
        ),
    },
    {
        accessorKey: "dealer_name",
        header: "Dealer Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("dealer_name")}</div>
        ),
    },
    {
        accessorKey: "brand_item",
        header: "Brand Item",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("brand_item")}</div>
        ),
    },
    {
        accessorKey: "ro_status",
        header: "RO Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("ro_status")}</div>
        ),
    },
    {
        accessorKey: "po_status",
        header: "PO Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("po_status")}</div>
        ),
    },
    {
        accessorKey: "count_sended_email",
        header: "Send Mail PO",
        cell: ({ row }) => (
            <div>{row.getValue("count_sended_email")}</div>
        ),
    },
    {
        accessorKey: "po_days",
        header: "PO Days",
        cell: ({ row }) => (
            <div>{row.getValue("po_days")}</div>
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
                            Send Email PO
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Open CM
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function ListMainAcquisition() {
    const route = useRouter();
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
                    <Button className="ml-auto w-full md:w-auto" onClick={() => route.push('/acquisition/main/cas')}>
                        Add New Customer Data Acquisition
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
