import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

// 📌 GET all jobs
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM jobs ORDER BY created_at DESC;");
    return NextResponse.json({ message: "Success", jobs: rows });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching jobs", error }, { status: 500 });
  }
}

// 📌 GET a single job by ID
export async function GET_BY_ID(req: Request, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id;
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM jobs WHERE id = ?;", [jobId]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", job: rows[0] });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching job", error }, { status: 500 });
  }
}

// 📌 UPDATE a job by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id;
    const { title, description, company, location, salary, user_id } = await req.json();

    const query = `
      UPDATE jobs 
      SET title = ?, description = ?, company = ?, location = ?, salary = ?, user_id = ?
      WHERE id = ?;
    `;

    const [result] = await pool.query<ResultSetHeader>(query, [title, description, company, location, salary, user_id, jobId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Job not found or no changes made" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job updated successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error updating job", error }, { status: 500 });
  }
}

// 📌 DELETE a job by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const jobId = params.id;
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM jobs WHERE id = ?;", [jobId]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Job deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting job", error }, { status: 500 });
  }
}
