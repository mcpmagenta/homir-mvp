import { Button } from "@/components/ui/button"

export function SocialLoginButtons() {
  return (
    <div className="grid gap-2">
      <Button variant="outline" className="w-full" onClick={() => console.log("Google login")}>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>
      <Button variant="outline" className="w-full" onClick={() => console.log("Microsoft login")}>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"
            fill="#00A4EF"
          />
        </svg>
        Continue with Microsoft Account
      </Button>
      <Button variant="outline" className="w-full" onClick={() => console.log("Apple login")}>
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <path
            d="M14.94 5.19A4.38 4.38 0 0 0 16 2.5a4.38 4.38 0 0 0-2.89 1.48 4.1 4.1 0 0 0-1.03 2.63c1.07.08 2.09-.36 2.86-1.42zM19.5 15.5c.05 2.73 2.39 3.63 2.42 3.64-.02.06-.35 1.19-1.15 2.36-.69 1.01-1.41 2.02-2.54 2.04-1.11.02-1.47-.66-2.74-.66s-1.67.64-2.72.68c-1.09.04-1.92-1.09-2.62-2.09-1.43-2.06-2.52-5.84-1.05-8.38.72-1.27 2.02-2.07 3.43-2.09 1.07-.02 2.08.72 2.73.72.65 0 1.87-.89 3.15-.76.54.02 2.04.22 3.01 1.63-.08.05-1.8 1.04-1.78 3.11h-.14z"
            fill="currentColor"
          />
        </svg>
        Continue with Apple
      </Button>
    </div>
  )
}

