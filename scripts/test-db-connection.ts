import { db } from "../lib/mock-db"

async function main() {
  try {
    // Test creating a user
    const user = await db.user.create({
      data: {
        email: "test@example.com",
        password: "password123",
        role: "RECIPIENT",
      },
    })
    console.log("Successfully created a test user:", user)

    // Test finding a user
    const foundUser = await db.user.findUnique({
      where: { email: "test@example.com" },
    })
    console.log("Successfully found user:", foundUser)
  } catch (error) {
    console.error("Error testing mock database:", error)
  }
}

main()

