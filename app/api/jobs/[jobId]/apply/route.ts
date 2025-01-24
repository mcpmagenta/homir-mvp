import { NextResponse, type NextRequest } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest, { params }: { params: { jobId: string } }) {
  try {
    const { user, decoded } = await verifyAuth(request)

    if (decoded.role !== "CAREGIVER") {
      return NextResponse.json({ message: "Only caregivers can apply for jobs" }, { status: 403 })
    }

    const jobApplication = await prisma.jobApplication.create({
      data: {
        jobId: params.jobId,
        caregiverId: user.id,
      },
    })

    return NextResponse.json(jobApplication)
  } catch (error) {
    console.error("Error applying for job:", error)
    if (error instanceof Error && error.message === "Invalid token") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.json({ message: "An error occurred while applying for the job" }, { status: 500 })
  }
}

