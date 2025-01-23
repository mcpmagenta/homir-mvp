import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createApiResponse, ApiError, handleApiError } from "@/lib/api-utils"
import { z } from "zod"

const prisma = new PrismaClient()

// Input validation schemas
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
        throw new ApiError("Role is required for registration")
      }

      const hashedPassword = await bcrypt.hash(validated.password, 10)
      const user = await prisma.user.create({
        data: {
          email: validated.email,
          password: hashedPassword,
          role: validated.role,
        },
        select: {
          id: true,
          email: true,
          role: true,
        },
      })

      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" })

      return NextResponse.json(createApiResponse({ user, token }))
    } else {
      const user = await prisma.user.findUnique({
        where: { email: validated.email },
        select: {
          id: true,
          email: true,
          role: true,
          password: true,
        },
      })

      if (!user || !(await bcrypt.compare(validated.password, user.password))) {
        throw new ApiError("Invalid credentials", 401)
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "7d" })

      const { password, ...userWithoutPassword } = user
      return NextResponse.json(
        createApiResponse({
          user: userWithoutPassword,
          token,
        }),
      )
    }
  } catch (error) {
    const apiResponse = await handleApiError(error)
    return NextResponse.json(apiResponse, {
      status: error instanceof ApiError ? error.statusCode : 500,
    })
  }
}

