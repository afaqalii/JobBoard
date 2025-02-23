import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { user_id, job_id } = await req.json();

    if (!user_id || !job_id) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const query = "INSERT INTO applications (user_id, job_id) VALUES (?, ?)";
    const values = [user_id, job_id];

    const [result] = await pool.query(query, values);

    return NextResponse.json(
      { message: "Application submitted", applicationId: (result as any).insertId },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error applying for job", error }, { status: 500 });
  }
}
