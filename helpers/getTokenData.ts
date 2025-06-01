import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getTokenData(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      throw new Error("Token not found");
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    if (
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      "id" in decodedToken
    ) {
      return (decodedToken as jwt.JwtPayload).id;
    } else {
      throw new Error("Invalid token payload");
    }
  } catch (error: unknown) {
    let errorMessage = "Invalid token";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
}
