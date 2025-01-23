"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"

export default function Register() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState(searchParams.get("role") || "RECIPIENT")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role, mode: "register" }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("token", data.token)
        toast({
          title: "Registration successful",
          description: "Welcome to Homir!",
        })
        router.push("/dashboard")
      } else {
        throw new Error(data.message || "Registration failed")
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Register for Homir</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Role</Label>
          <RadioGroup value={role} onValueChange={setRole}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="CAREGIVER" id="caregiver" />
              <Label htmlFor="caregiver">Caregiver</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="RECIPIENT" id="recipient" />
              <Label htmlFor="recipient">Care Recipient</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  )
}

