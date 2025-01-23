import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { createApiResponse, ApiError, handleApiError } from "@/lib/api-utils"
import { z } from "zod"
import { headers } from "next/headers"

const prisma = new PrismaClient()

const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string(),
  serviceType: z.enum(["HOME_CARE", "SENIOR_CARE", "CHILD_CARE"]),
})

export async function GET(request: Request) {
  try {
    const headersList = headers()
    const userId = headersList.get("x-user-id")
    const userRole = headersList.get("x-user-role")

    if (!userId || !userRole) {
      throw new ApiError("User context not found", 401)
    }

    const searchParams = new URL(request.url).searchParams
    const serviceType = searchParams.get("serviceType")
    const location = searchParams.get("location")

    const query: any = {}

    if (userRole === "CAREGIVER") {
      query.status = "OPEN"
      if (serviceType) {
        query.serviceType = serviceType
      }
      if (location) {
        query.location = location
      }
    } else {
      query.recipientId = userId
    }

    const jobs = await prisma.job.findMany({
      where: query,
      include: {
        applications: {
          select: {
            id: true,
            status: true,
            caregiverId: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(createApiResponse({ jobs, userRole }))
  } catch (error) {
    const apiResponse = await handleApiError(error)
    return NextResponse.json(apiResponse, {
      status: error instanceof ApiError ? error.statusCode : 500,
    })
  }
}

export async function POST(request: Request) {
  try {
    const headersList = headers()
    const userId = headersList.get("x-user-id")
    const userRole = headersList.get("x-user-role")

    if (!userId || !userRole) {
      throw new ApiError("User context not found", 401)
    }

    if (userRole !== "RECIPIENT") {
      throw new ApiError("Only recipients can create jobs", 403)
    }

    const body = await request.json()
    const validated = jobSchema.parse(body)

    const job = await prisma.job.create({
      data: {
        ...validated,
        recipientId: userId,
      },
    })

    // In a production environment, you would trigger a WebSocket event here
    // to notify relevant users about the new job

    return NextResponse.json(createApiResponse(job))
  } catch (error) {
    const apiResponse = await handleApiError(error)
    return NextResponse.json(apiResponse, {
      status: error instanceof ApiError ? error.statusCode : 500,
    })
  }
}

