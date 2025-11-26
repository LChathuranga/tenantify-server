import { UserRole } from "./userRole"

export interface JwtPayload {
  sub: string
  email: string
  role: UserRole
}
