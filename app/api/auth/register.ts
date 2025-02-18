import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { pool } from "@/app/lib/data";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email already exists
    const userExists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRes = await pool.query(`INSERT INTO users (name, email) VALUES (${name}, ${email}) RETURNING id`,);
    const userId = userRes.rows[0].id;

    // Insert authentication details into `auth_users`
    await pool.query(
      "INSERT INTO auth_users (user_id, provider, provider_id, password_hash) VALUES ($1, $2, $3, $4)",
      [userId, "credentials", email, hashedPassword]
    );

    client.release();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}