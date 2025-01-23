import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { db } from "./mock-db"

export async function verifyAuth(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "")

    if (!token) {
      throw new Error("No token provided")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string
      role: string
    }

    const user = await db.user.findUnique({
      where: { id: decoded.userId },
    })

    if (!user) {
      throw new Error("User not found")
    }

    return { user, decoded }
  } catch (error) {
    throw new Error("Invalid token")
  }
}

