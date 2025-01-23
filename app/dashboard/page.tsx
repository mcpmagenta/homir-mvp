"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

interface Job {
  id: string
  title: string
  description: string
  location: string
  status: string
  serviceType: "HOME_CARE" | "SENIOR_CARE" | "CHILD_CARE"
}

export default function Dashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [jobs, setJobs] = useState<Job[]>([])
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        const response = await fetch("/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()
        if (response.ok) {
          setJobs(data.jobs)
          setUserRole(data.userRole)
        } else {
          throw new Error(data.message || "Failed to fetch jobs")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
    }

    fetchJobs()
  }, [router, toast])

  const handleApply = async (jobId: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (response.ok) {
        toast({
          title: "Application submitted",
          description: "Your application has been sent to the care recipient.",
        })
        // Update the job status in the local state
        setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status: "APPLIED" } : job)))
      } else {
        throw new Error(data.message || "Failed to apply for job")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {userRole === "RECIPIENT" && (
        <Button asChild className="mb-4">
          <Link href="/jobs/create">Create New Job</Link>
        </Button>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{job.description}</p>
              <p className="mb-2">Location: {job.location}</p>
              <p className="mb-2">Service: {job.serviceType.replace("_", " ")}</p>
              <p className="mb-4">Status: {job.status}</p>
              {userRole === "CAREGIVER" && job.status === "OPEN" && (
                <Button onClick={() => handleApply(job.id)}>Apply</Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

