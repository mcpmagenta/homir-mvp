import { Separator } from "@/components/ui/separator"

interface SeparatorWithTextProps {
  children: React.ReactNode
}

export function SeparatorWithText({ children }: SeparatorWithTextProps) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-0 flex items-center">
        <Separator className="w-full" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">{children}</span>
      </div>
    </div>
  )
}

