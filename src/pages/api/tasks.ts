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
  if (req.method === "GET") {
    const tasks = await readTasks();
    const { page = "1", limit = "10", search } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);

    let filteredTasks = tasks;

    if (search) {
        const searchTerm = (search as string).toLowerCase();
        filteredTasks = filteredTasks.filter((task: any) =>
            task.namaTask.toLowerCase().includes(searchTerm) ||
            task.deskripsiTask.toLowerCase().includes(searchTerm) ||
            task.isiTask.toLowerCase().includes(searchTerm) ||
            task.statusTask.toLowerCase().includes(searchTerm)
        );
    }

    const totalTasks = filteredTasks.length;
    const totalPages = Math.ceil(totalTasks / limitNumber);
    
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = Math.min(startIndex + limitNumber, totalTasks);
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    return res.status(200).json({
        tasks: paginatedTasks,
        currentPage: pageNumber,
        totalPages,
        totalTasks,
    });
}

  if (req.method === "POST") {
    try {
      const { namaTask, deskripsiTask, isiTask, statusTask, startTask, endTask } = req.body;
      if (!namaTask || !deskripsiTask || !isiTask || !statusTask) {
        return res.status(400).json({ error: "Data tidak lengkap" });
      }

      const tasks = await readTasks();
      const newTask = { id: Date.now(), namaTask, deskripsiTask, isiTask, statusTask, startTask, endTask };
      tasks.push(newTask);
      await writeTasks(tasks);

      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(500).json({ error: "Gagal menambahkan task" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
