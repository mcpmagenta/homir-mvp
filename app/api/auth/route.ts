import { NextResponse } from "next/server"
import { db } from "@/lib/mock-db"
import { createApiResponse, ApiError, handleApiError } from "@/lib/api-utils"
import { z } from "zod"

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  mode: z.enum(["register", "login"]),
  role: z.enum(["CAREGIVER", "RECIPIENT"]).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = authSchema.parse(body)

    if (validated.mode === "register") {
      if (!validated.role) {
        throw new ApiError("Role is required for registration", 400)
      }

      const existingUser = await db.user.findUnique({
        where: { email: validated.email },
      })

      if (existingUser) {
        throw new ApiError("User already exists", 400)
      }

      const user = await db.user.create({
        data: {
          email: validated.email,
          password: validated.password, // In a real app, this should be hashed
          role: validated.role,
        },
      })

      return NextResponse.json(createApiResponse({ user }))
    } else {
      const user = await db.user.findUnique({
        where: { email: validated.email },
      })

      if (!user || user.password !== validated.password) {
        throw new ApiError("Invalid credentials", 401)
      }

      return NextResponse.json(createApiResponse({ user }))
    }
  } catch (error: unknown) {
    const apiResponse = await handleApiError(error)
    return NextResponse.json(apiResponse, {
      status: error instanceof ApiError ? error.statusCode : 500,
    })
  }
}

