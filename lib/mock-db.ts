import type { User, Job } from "./types"

class MockDB {
  private users: User[] = []
  private jobs: Job[] = []

  user = {
    findUnique: async ({ where }: { where: { id?: string; email?: string } }) => {
      if (where.id) {
        return this.users.find((u) => u.id === where.id) || null
      }
      if (where.email) {
        return this.users.find((u) => u.email === where.email) || null
      }
      return null
    },
    create: async ({ data }: { data: Omit<User, "id" | "createdAt" | "updatedAt"> }) => {
      const newUser = {
        ...data,
        id: `user_${this.users.length + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.users.push(newUser)
      return newUser
    },
  }

  job = {
    create: async ({ data }: { data: Omit<Job, "id" | "createdAt" | "updatedAt"> }) => {
      const newJob = {
        ...data,
        id: `job_${this.jobs.length + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.jobs.push(newJob)
      return newJob
    },
    findMany: async () => {
      return this.jobs
    },
  }
}

export const db = new MockDB()

