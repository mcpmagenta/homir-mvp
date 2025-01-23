"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function CreateJob() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [serviceType, setServiceType] = useState<"HOME_CARE" | "SENIOR_CARE" | "CHILD_CARE">("HOME_CARE")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, location, serviceType }),
      })
      const data = await response.json()
      if (response.ok) {
        toast({
          title: "Job created",
          description: "Your job has been posted successfully.",
        })
        router.push("/dashboard")
      } else {
        throw new Error(data.message || "Failed to create job")
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
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="serviceType">Service Type</Label>
          <select
            id="serviceType"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value as "HOME_CARE" | "SENIOR_CARE" | "CHILD_CARE")}
            className="w-full p-2 border rounded-md"
            required
          >
            <option value="HOME_CARE">Home Care</option>
            <option value="SENIOR_CARE">Senior Care</option>
            <option value="CHILD_CARE">Child Care</option>
          </select>
        </div>
        <Button type="submit" className="w-full">
          Create Job
        </Button>
      </form>
    </div>
  )
}

