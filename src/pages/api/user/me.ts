import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

    const filePath = path.join(process.cwd(), "public", "users.json");
    const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

    const user = users.find((u: any) => u.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
