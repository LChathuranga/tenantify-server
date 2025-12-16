import { User } from '../model/User'
import { getEmail } from '../utils/jwtProvider'
import { ValidationError } from '../errors/ValidationError'

export async function findUserByEmail(email: string) {
  return await User.findOne({ where: { email } })
}

export async function findUserById(id: number) {
  return await User.findByPk(id)
}

export async function getAllUsers() {
  return await User.findAll()
}

export async function getUserFromJwtToken(token: string) {
  if (!token || typeof token !== 'string') {
    throw new ValidationError(400, 'Validation failed', ['Token is required'])
  }
  const email = getEmail(token)
  if (!email) {
    throw new ValidationError(400, 'Validation failed', ['Invalid token'])
  }
  const user: User | null = await findUserByEmail(email)
  if (!user) {
    throw new ValidationError(404, 'User not found', ['No user found for this token'])
  }
  return user
}

export async function getCurrentUser(userId: number) {
  if (!userId) {
    throw new ValidationError(401, 'Unauthorized', ['User ID not found in request'])
  }
  const user = await User.findByPk(userId)
  if (!user) {
    throw new ValidationError(404, 'User not found', ['No user found for this ID'])
  }
  return user
}
