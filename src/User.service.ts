import { injectable } from 'inversify'
import { UserRepository } from './User.repository'
//This means this can be binded(injectable)
@injectable()
export class UserService {
  constructor(private readonly _userRepo: UserRepository) {}

  async getUsers() {
    const users = this._userRepo.getUsers()
    return users
  }
}
