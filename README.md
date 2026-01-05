# Inversify

1. Install packages for injection

```bash
npm i @types/inversify inversify inversify-express-utils reflect-metadata
```

2. Create server (bootstrap is the entry point) in `Bootstrap.ts`

```ts
import 'dotenv/config'
import 'reflect-metadata'

import { UserRepository } from './User.repository'
import { UserService } from './User.service'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'

// ⭐️ NEED to import the controllers here for it to detect it
import './User.controller'

async function Bootstrap() {
  const container = new Container()

  //if we ask for userRepository in a constructor, use this one => make it injectable for it using ⭐️"@injectable"
  container.bind(UserRepository).toSelf()

  //if we ask for UserService in a constructor, use this one => make it injectable for it using ⭐️"@injectable"
  container.bind(UserService).toSelf()

  // takes in the container
  const server = new InversifyExpressServer(container)

  //Applies all routes and configuration to the server, returning the express application.
  const app = server.build()

  app.listen(5004, () => {
    console.log('Server connected on http://localhost:5004/')
  })
}

Bootstrap()
```

3. To make the routes clear, in the controllers use `@controller("/route")` When needing a specific function to execute at a route within a controller, use `@httpGet("/route")`.

example: `User.controller.ts`

```ts
import { controller, httpGet } from 'inversify-express-utils'
import { UserService } from './User.service'

// for api
@controller('/users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  // "/users/"
  @httpGet('/')
  async index() {
    const users = await this._userService.getUsers()
    return `number of users: ${users.length}`
  }
}
```

4. To make `services and repositories` bind with a container, use `@injectable()`.

```ts
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
```

5. Once it works, you can check the server at the port mentioned.
