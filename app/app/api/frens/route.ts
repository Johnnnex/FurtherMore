import supabase from "@/config";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user");

  if (!user) {
    return NextResponse.json(
      { error: "Referrer is required" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from("referral")
      .select("*, users(*)")
      .eq("refree", user);

    if (error) throw error;

    return NextResponse.json({
      code: 200,
      message: "Referrals fetched successfully",
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
