import { User } from '../model/User'

export async function findByEmail(email: string) {
  return await User.findOne({ where: { email } })
}
