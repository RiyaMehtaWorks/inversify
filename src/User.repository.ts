import { injectable } from 'inversify'

@injectable()
export class UserRepository {
  //   private readonly _db = Database

  public async getUsers() {
    return []
  }
}
