import { NextResponse, type NextRequest } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyAuth } from "@/lib/auth"

const prisma = new PrismaClient()

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
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }
}

