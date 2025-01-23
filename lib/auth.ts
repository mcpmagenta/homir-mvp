import jwt from "jsonwebtoken"

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string }
  } catch (error) {
    throw new Error("Invalid token")
  }
}

