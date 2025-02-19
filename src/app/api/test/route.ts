import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT 'Connection Successful' as message");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }
}
