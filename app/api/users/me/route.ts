import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
// import { get } from "http";

connect();

export async function GET(req: NextRequest) {
  try {
    const userId = await getTokenData(req);
    // Find the user by ID
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json(
      {
        message: "User found",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
