import supabase from "@/config";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("u_id", userId)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      code: 200,
      message: "User fetched successfully",
      data,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const { data, error: userError } = await supabase
      .from("users")
      .update({ is_new: false })
      .eq("u_id", userId)
      .select()
      .single();

    if (userError) throw userError;

    const { error: rewardError } = await supabase
      .from("rewards")
      .insert({ user_id: userId, time_spent: 0 })
      .select()
      .single();

    if (rewardError) throw rewardError;

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      code: 200,
      message: "User updated successfully",
      data,
    });
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    console.log(err);
    return NextResponse.json(
      { error: err?.response?.data.error || "Internal Server Error" },
      { status: err.status || 500 }
    );
  }
}
