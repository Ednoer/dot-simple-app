"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "namaTask",
    header: "Nama Task",
  },
  {
    accessorKey: "deskripsiTask",
    header: "Deskripsi Task",
    cell: ({ row }: any) => <div className="truncate max-w-[200px]" title={row.getValue("deskripsiTask")}>
      {row.getValue("deskripsiTask")}
    </div>
  },
  {
    accessorKey: "isiTask",
    header: "Isi Task",
    cell: ({ row }: any) => <div className="truncate max-w-[200px]" title={row.getValue("isiTask")}>
      {row.getValue("isiTask")}
    </div>
  },
  {
    accessorKey: "statusTask",
    header: "Status Task",
    cell: ({ row }: any) => <Badge variant={row.getValue("statusTask") === "Completed" ? "default" : "destructive"}>
      {row.getValue("statusTask")}
    </Badge>
  },
  {
    accessorKey: "startTask",
    header: "Mulai Task",
    cell: ({ row }: any) => dayjs(row.getValue("startTask")).format("DD MMMM YYYY")
  },
  {
    accessorKey: "endTask",
    header: "Selesai Task",
    cell: ({ row }: any) => dayjs(row.getValue("endTask")).format("DD MMMM YYYY")
  },
];
