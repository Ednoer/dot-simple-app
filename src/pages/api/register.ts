import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const filePath = path.join(process.cwd(), "public", "users.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let users = [];

  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    users = JSON.parse(fileData);
  }

  const newUser = { id: Date.now(), username, email, password };
  users.push(newUser);

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User registered successfully", user: newUser });
}
