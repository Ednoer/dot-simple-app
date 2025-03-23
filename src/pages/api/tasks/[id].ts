import { promises as fs } from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "public", "tasks.json");

async function readTasks() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeTasks(tasks: any) {
  await fs.writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "ID diperlukan" });
  }

  let tasks = await readTasks();

  if (req.method === "PUT") {
    try {
      const { namaTask, deskripsiTask, isiTask, statusTask, startTask, endTask } = req.body;
      if (!namaTask || !deskripsiTask || !isiTask || !statusTask) {
        return res.status(400).json({ error: "Data tidak lengkap" });
      }

      const taskIndex = tasks.findIndex((task: any) => task.id === Number(id));
      if (taskIndex === -1) {
        return res.status(404).json({ error: "Task tidak ditemukan" });
      }

      tasks[taskIndex] = { ...tasks[taskIndex], namaTask, deskripsiTask, isiTask, statusTask, startTask, endTask };
      await writeTasks(tasks);

      return res.status(200).json({ message: "Task updated" });
    } catch (error) {
      return res.status(500).json({ error: "Gagal memperbarui task" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const filteredTasks = tasks.filter((task: any) => task.id !== Number(id));
      if (tasks.length === filteredTasks.length) {
        return res.status(404).json({ error: "Task tidak ditemukan" });
      }

      await writeTasks(filteredTasks);
      return res.status(200).json({ message: "Task deleted" });
    } catch (error) {
      return res.status(500).json({ error: "Gagal menghapus task" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
