import Database, { IUser, UserRequestDto } from './Database'

// NOTE: Make db public instead of private. This is required for the tests.
export class UserRepository {
  public readonly db = Database

  async createUser(user: Omit<IUser, 'id'>) {
    const createdUser = await this.db.create(user)
    return createdUser
  }
}
