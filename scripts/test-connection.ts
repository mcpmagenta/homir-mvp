import { db } from "../lib/mock-db"

async function main() {
  try {
    // Create a test user
    const user = await db.user.create({
      data: {
        email: "connection-test@example.com",
        password: "test123",
        role: "RECIPIENT",
      },
    })
    console.log("Mock database connection successful!")
    console.log("Test user created:", user)
  } catch (error) {
    console.error("Failed to test mock database:")
    console.error(error)
  }
}

main()

