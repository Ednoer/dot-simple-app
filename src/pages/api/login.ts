import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from "next";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const filePath = path.join(process.cwd(), 'public', 'users.json');
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const user = users.find((u: any) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h',
  });

  return res.status(200).json({ message: 'Login successful', token });
}
