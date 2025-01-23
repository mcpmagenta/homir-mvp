import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { verifyToken } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(request: Request, { params }: { params: { jobId: string } }) {
  const token = request.headers.get("authorization")?.split(" ")[1]
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const decoded = verifyToken(token)
    if (decoded.role !== "CAREGIVER") {
      return NextResponse.json({ message: "Only caregivers can apply for jobs" }, { status: 403 })
    }

    const jobApplication = await prisma.jobApplication.create({
      data: {
        jobId: params.jobId,
        caregiverId: decoded.userId,
      },
    })

    return NextResponse.json(jobApplication)
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}

