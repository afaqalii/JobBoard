import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { title, description, company, location, salary, user_id } = await req.json();

    if (!title || !description || !company || !location || !salary || !user_id) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const query =
      "INSERT INTO jobs (title, description, company, location, salary, user_id) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [title, description, company, location, salary, user_id];

    const [result] = await pool.query(query, values);

    return NextResponse.json({ message: "Job created", jobId: (result as any).insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating job", error }, { status: 500 });
  }
}
