export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode = 400,
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export function createApiResponse<T>(data: T) {
  return {
    success: true,
    data,
  }
}

export async function handleApiError(error: unknown) {
  console.error("API Error:", error)

  if (error instanceof ApiError) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: false,
    error: "Internal server error",
  }
}

