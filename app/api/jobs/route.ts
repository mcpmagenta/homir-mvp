import { NextResponse } from "next/server"
import { db } from "@/lib/mock-db"
import { createApiResponse, ApiError, handleApiError } from "@/lib/api-utils"
import { z } from "zod"

const jobSchema = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  salary: z.number(),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT"]),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = jobSchema.parse(body)

    const job = await db.job.create({
      data: validated,
    })

    return NextResponse.json(createApiResponse(job))
  } catch (error: unknown) {
    const apiResponse = await handleApiError(error)
    return NextResponse.json(apiResponse, {
      status: error instanceof ApiError ? error.statusCode : 500,
    })
  }
}

export async function GET() {
  try {
    const jobs = await db.job.findMany()
    return NextResponse.json(createApiResponse(jobs))
  } catch (error: unknown) {
    const apiResponse = await handleApiError(error)
    return NextResponse.json(apiResponse, {
      status: error instanceof ApiError ? error.statusCode : 500,
    })
  }
}

