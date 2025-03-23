"use client";

import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { columns } from "./columns";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import api from "@/lib/axiosInstances";
import { useDebounce } from "use-debounce";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";

const taskSchema = yup.object({
    namaTask: yup.string().required("Nama Task harus diisi"),
    deskripsiTask: yup.string().required("Deskripsi Task harus diisi"),
    isiTask: yup.string().required("Isi Task harus diisi"),
    startTask: yup.string().required("Mulai Task harus diisi"),
    endTask: yup.string().notRequired(),
    statusTask: yup.mixed<"Pending" | "Completed" | "Processing" | "Aborted">()
        .oneOf(["Pending", "Completed", "Processing", "Aborted"], "Status tidak valid")
        .required("Status Task harus diisi"),
});

type TaskFormValues = yup.InferType<typeof taskSchema>;

export default function TaskTable() {
    const isMobile = useIsMobile()

    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);
    const [page, setPage] = useState(1);
    const limit = 10;

    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

    const { register, handleSubmit, reset, setValue, formState: { errors }, getValues, watch } = useForm<TaskFormValues>({
        resolver: yupResolver(taskSchema),
        defaultValues: {
            namaTask: "",
            deskripsiTask: "",
            isiTask: "",
            statusTask: "Pending",
        },
    });

    const { data, isLoading } = useQuery({
        queryKey: ["tasks", page, debouncedSearch],
        queryFn: async () => {
            const res = await api.get(`/tasks?page=${page}&limit=${limit}&search=${debouncedSearch}`);
            return res.data;
        },
    });
    const tasks = data?.tasks || []

    const createTask = useMutation({
        mutationFn: async (task: any) => await api.post("/tasks", task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task berhasil ditambahkan");
            setOpen(false);
            reset();
        },
        onError: () => toast.error("Gagal menambahkan task"),
    });


    const updateTask = useMutation({
        mutationFn: async (task: any) => await api.put(`/tasks/${editingTaskId}`, task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task berhasil diperbarui");
            setOpen(false);
            reset();
            setEditingTaskId(null);
        },
        onError: () => toast.error("Gagal memperbarui task"),
    });

    const deleteTask = useMutation({
        mutationFn: async (id: number) => await api.delete(`/tasks/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            toast.success("Task berhasil dihapus");
        },
        onError: () => toast.error("Gagal menghapus task"),
    });


    const onSubmit = (data: any) => {
        if (editMode) {
            updateTask.mutate(data);
        } else {
            createTask.mutate(data);
        }
    };

    const handleEdit = (task: any) => {
        setEditMode(true);
        setEditingTaskId(task.id);
        setValue("namaTask", task.namaTask);
        setValue("deskripsiTask", task.deskripsiTask);
        setValue("isiTask", task.isiTask);
        setValue("statusTask", task.statusTask);
        setValue("startTask", task.startTask);
        setValue("endTask", task.endTask);
        setOpen(true);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center">
                <div>
                    <Input placeholder="Filter..." onChange={(e) => setSearch(e.target.value)} />
                </div>

                {/* modal change data */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { reset(); setEditMode(false); }} size="sm">Tambah Task</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{editMode ? "Edit Task" : "Tambah Task"}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <Label>Nama Task</Label>
                            <Input {...register("namaTask")} />
                            <p className="text-red-500 text-sm">{errors.namaTask?.message}</p>

                            <Label>Deskripsi Task</Label>
                            <Input {...register("deskripsiTask")} />
                            <p className="text-red-500 text-sm">{errors.deskripsiTask?.message}</p>

                            <Label>Isi Task</Label>
                            <Textarea {...register("isiTask")} />
                            <p className="text-red-500 text-sm">{errors.isiTask?.message}</p>

                            <Label>Tanggal Mulai</Label>
                            <Input type="date" {...register("startTask")} />
                            <p className="text-red-500 text-sm">{errors.startTask?.message}</p>

                            <Label>Tanggal Selesai</Label>
                            <Input type="date" {...register("endTask")} />
                            <p className="text-red-500 text-sm">{errors.endTask?.message}</p>

                            <Label>Status Task</Label>
                            <Select
                                value={watch("statusTask")}
                                onValueChange={(value: "Pending" | "Completed" | "Processing" | "Aborted") => setValue("statusTask", value)} defaultValue="">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                    <SelectItem value="Processing">Processing</SelectItem>
                                    <SelectItem value="Aborted">Aborted</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="flex flex-row justify-end">
                                <Button type="submit">{editMode ? "Simpan Perubahan" : "Tambah Task"}</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* content loader */}
            {
                isLoading &&
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-[40px] rounded-md" />
                    <Skeleton className="h-[40px] rounded-md" />
                    <Skeleton className="h-[40px] rounded-md" />
                </div>
            }

            {/* mobile responsive */}
            {
                isMobile &&
                <div className="space-y-2">
                    {tasks.map((task: any) => (
                        <Card key={task.id} className="shadow-lg border border-gray-200 rounded-lg transition hover:shadow-xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="text-md font-semibold text-gray-800">{task.namaTask}</CardTitle>
                                <Badge variant={task.statusTask === "Completed" ? "default" : "destructive"}>
                                    {task.statusTask}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p className="text-sm font-bold text-gray-600">{task.deskripsiTask}</p>
                                <p className="text-sm text-gray-600">{task.isiTask}</p>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span className="font-medium">Mulai: {dayjs(task.startTask).format("DD MMMM YYYY")}</span>
                                    <span className="font-medium">Selesai: {dayjs(task.endTask).format("DD MMMM YYYY")}</span>
                                </div>
                                <div className="mt-3 flex gap-2 justify-end">
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(task)}>Edit</Button>
                                    <Button size="sm" variant="destructive" onClick={() => deleteTask.mutate(task.id)}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            }

            {/* non mobile responsive */}
            {
                !isLoading &&
                <Fragment>

                    {
                        !isMobile &&
                        <DataTable columns={[...columns, {
                            id: "actions",
                            header: "Actions",
                            cell: ({ row }) => (
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(row.original)}>Edit</Button>
                                    <Button size="sm" variant="destructive" onClick={() => deleteTask.mutate(row.original.id)}>Delete</Button>
                                </div>
                            ),
                        }]} data={tasks} />
                    }

                    {/* pagination */}
                    <div className="flex justify-end flex-row gap-2 items-center mt-4">
                        <Button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            size="sm"
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={() => setPage((prev) => prev + 1)}
                            disabled={data?.totalPages == 0 || data?.currentPage === data?.totalPages}
                            size="sm"
                        >
                            Next
                        </Button>
                    </div>
                </Fragment>
            }

        </div>
    );
}
