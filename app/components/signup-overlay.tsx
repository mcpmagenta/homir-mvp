"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface SignupOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SignupOverlay({ isOpen, onClose }: SignupOverlayProps) {
  const [selectedRole, setSelectedRole] = useState<"caregiver" | "recipient" | null>(null)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Join Homir</DialogTitle>
          <DialogDescription className="text-center text-base">Choose how you want to use Homir</DialogDescription>
        </DialogHeader>
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="grid grid-cols-2 gap-6 p-6">
          <button
            onClick={() => setSelectedRole("recipient")}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
              selectedRole === "recipient"
                ? "border-[#407A59] bg-[#407A59]/5"
                : "border-border hover:border-[#407A59]/50",
            )}
          >
            <div className="w-16 h-16 rounded-full bg-[#407A59]/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#407A59]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Looking for care</h3>
            <p className="text-sm text-center text-muted-foreground">
              Find and book trusted caregivers for your family
            </p>
          </button>

          <button
            onClick={() => setSelectedRole("caregiver")}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all",
              selectedRole === "caregiver"
                ? "border-[#407A59] bg-[#407A59]/5"
                : "border-border hover:border-[#407A59]/50",
            )}
          >
            <div className="w-16 h-16 rounded-full bg-[#407A59]/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#407A59]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Become a caregiver</h3>
            <p className="text-sm text-center text-muted-foreground">Find flexible jobs and set your own schedule</p>
          </button>
        </div>

        <div className="flex justify-center px-6 pb-6">
          <Button
            className="w-full bg-[#407A59] hover:bg-[#407A59]/90"
            size="lg"
            disabled={!selectedRole}
            onClick={() => {
              if (selectedRole) {
                window.location.href = `/register?role=${selectedRole}`
              }
            }}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

