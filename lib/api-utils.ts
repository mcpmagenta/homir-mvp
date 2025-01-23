export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  version: string
}

export function createApiResponse<T>(data?: T, error?: string): ApiResponse<T> {
  return {
    success: !error,
    data,
    error,
    version: "v1",
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode = 400,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export async function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return createApiResponse(undefined, error.message)
  }
  console.error("API Error:", error)
  return createApiResponse(undefined, "Internal server error")
}

