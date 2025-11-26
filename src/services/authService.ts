import { AuthResponse } from '../dto/AuthResponse'

import { User } from '../model/User'
import { generateJwt } from '../utils/jwt'
import { UserAttributes } from '../types/user'
import { UserRole } from '../types/userRole'
import { comparePassword, hashPassword } from '../utils/password'
import { MESSAGES } from '../constants/messages'

export async function signup(userData: UserAttributes): Promise<AuthResponse> {
  try {
    const existingUser = await User.findOne({ where: { email: userData.email } })
    if (existingUser) {
      throw new Error(MESSAGES.EMAIL_EXISTS)
    }
    if (userData.role === UserRole.ROLE_ADMIN) {
      throw new Error(MESSAGES.ADMIN_NOT_ALLOWED)
    }
    userData.password = await hashPassword(userData.password!)
    console.log('--------------------', userData);
    
    const user = await User.create(userData)
    const token = generateJwt({
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    })
    return {
      jwt: token,
      message: MESSAGES.SIGNUP_SUCCESS,
      user: user,
    }
  } catch (err: any) {
    console.error('Error in signup:', err && err.message ? err.message : err)
    if (err && err.parent) {
      console.error('DB error detail:', err.parent)
    }
    throw err
  }
}

export async function login(userData: UserAttributes): Promise<AuthResponse> {
  const user = await authentication(userData.email, userData.password!)
  const token = generateJwt({
    sub: user.id.toString(),
    email: user.email,
    role: user.role,
  })
  user.lastLogin = new Date()
  await user.save()
  return {
    jwt: token,
    message: MESSAGES.LOGIN_SUCCESS,
    user: user,
  }
}

async function authentication(email: string, password: string) {
  const user = await User.findOne({ where: { email } })
  if (!user) {
    throw new Error(MESSAGES.USER_NOT_FOUND)
  }
  const isMatch = await comparePassword(password, user.getPassword)
  if (!isMatch) {
    throw new Error(MESSAGES.PASSWORD_INVALID)
  }
  return user
}
