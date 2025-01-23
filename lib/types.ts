export interface User {
  id: string
  email: string
  password: string
  role: "CAREGIVER" | "RECIPIENT"
  createdAt: Date
  updatedAt: Date
}

export interface Job {
  id: string
  title: string
  description: string
  location: string
  salary: number
  jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT"
  createdAt: Date
  updatedAt: Date
}

export interface ServiceType {
  id: string
  name: string
  description: string
}

export interface Location {
  lat: number
  lng: number
  address: string
}

