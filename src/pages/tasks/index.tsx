"use client";

import MainLayout from "@/layouts/main/main-layout";
import TaskTable from "@/layouts/tasks/data-table";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Page() {
  const breadcrumbs = [
    { label: "Task Management", path: "#" },
    { label: "Tasks", path: "/tasks" },
  ];

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <TaskTable />
    </MainLayout>
  );
}
