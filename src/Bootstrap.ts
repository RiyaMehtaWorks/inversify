import 'dotenv/config'
import 'reflect-metadata'

import { UserRepository } from './User.repository'
import { UserService } from './User.service'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import './User.controller'

async function Bootstrap() {
  const container = new Container()
  container.bind(UserRepository).toSelf()
  container.bind(UserService).toSelf()

  const server = new InversifyExpressServer(container)
  const app = server.build()

  app.listen(5004, () => {
    console.log('Server connected on http://localhost:5004/')
  })
}

Bootstrap()
