import type { User, ServiceType } from "./types"

export const mockUsers: User[] = [
  {
    id: "1",
    email: "caregiver@example.com",
    role: "CAREGIVER",
  },
  {
    id: "2",
    email: "recipient@example.com",
    role: "RECIPIENT",
  },
]

export const mockServices: ServiceType[] = [
  {
    id: "home-care",
    name: "Home Care",
    description: "Personal assistance and home care services",
  },
  {
    id: "senior-care",
    name: "Senior Care",
    description: "Specialized care for seniors",
  },
  {
    id: "child-care",
    name: "Child Care",
    description: "Professional childcare services",
  },
]

