"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { SeparatorWithText } from "@/components/ui/separator-with-text"
import { SocialLoginButtons } from "@/components/social-login-buttons"

export default function Login() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<"email" | "password">("email")
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStep("password")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify email",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, mode: "login" }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("token", data.token)
        toast({
          title: "Login successful",
          description: "Welcome back to Homir!",
        })
        router.push("/dashboard")
      } else {
        throw new Error(data.message || "Login failed")
      }
    } catch (error: unknown) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-start pt-8 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Log in</h2>
        </div>

        {step === "email" ? (
          <>
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 rounded-lg bg-[#407A59] hover:bg-[#407A59]/90"
                disabled={isLoading}
              >
                {isLoading ? "Checking..." : "Continue"}
              </Button>
            </form>

            <div className="space-y-6">
              <SeparatorWithText>OR</SeparatorWithText>
              <SocialLoginButtons />
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#407A59] hover:text-[#407A59]/90">
                  Sign up
                </Link>
              </p>
            </div>
          </>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between h-12 px-4 bg-muted/50 rounded-lg border border-input">
                <span className="text-sm">{email}</span>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-[#407A59] hover:text-[#407A59]/90 p-0 h-auto"
                  onClick={() => setStep("email")}
                >
                  Edit
                </Button>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-12 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <Button
                type="button"
                variant="link"
                className="text-[#407A59] hover:text-[#407A59]/90 p-0 h-auto"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot password?
              </Button>
            </div>
            <Button
              type="submit"
              className="w-full h-12 rounded-lg bg-[#407A59] hover:bg-[#407A59]/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Continue"}
            </Button>
          </form>
        )}

        <div className="text-center space-x-2">
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground">
            Terms of Use
          </Link>
          <span className="text-xs text-muted-foreground">|</span>
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}

