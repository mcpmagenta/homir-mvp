import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export function middleware(request: NextRequest) {
  // Add API version header to all responses
  const response = NextResponse.next()
  response.headers.set("x-api-version", "v1")

  // Handle CORS for mobile apps
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      headers: {
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Max-Age": "86400",
      },
    })
  }

  // Add CORS headers to all responses
  response.headers.set("Access-Control-Allow-Origin", "*")
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

  // Check for protected routes
  if (request.nextUrl.pathname.startsWith("/api/") && !request.nextUrl.pathname.startsWith("/api/auth")) {
    const token = request.headers.get("authorization")?.split(" ")[1]

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    try {
      const decoded = verifyToken(token)
      // Add user info to request headers for route handlers
      response.headers.set("x-user-id", decoded.userId)
      response.headers.set("x-user-role", decoded.role)
    } catch {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 })
    }
  }

  return response
}

export const config = {
  matcher: "/api/:path*",
}

