import { UserAttributes } from '../types/user'

export interface AuthResponse {
  jwt: string
  message: string
  user: Omit<UserAttributes, 'password'> | {}
}
