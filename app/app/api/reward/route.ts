import { NextResponse } from "next/server";
import supabase from "@/config";

export async function PATCH(request: Request) {
  try {
    const { id, points } = await request.json();

    if (!id || typeof points !== "number") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("rewards")
      .update({ time_spent: points })
      .eq("user_id", id)
      .single();

    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
