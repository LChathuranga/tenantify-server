import { UserRole } from "./userRole"

export interface UserAttributes {
  id: number
  fullName: string
  email: string
  phone: string
  role: UserRole
  password?: string
  createdAt: Date
  updatedAt: Date
  lastLogin: Date
}
