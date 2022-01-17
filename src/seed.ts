import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'
import { plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import faker from 'faker'
import {
  ExamplesModule,
  ExamplesService,
  CreateExampleDto
} from './modules/examples/examples.module'
import {
  UsersModule,
  UsersService,
  CreateUserDto
} from './modules/users/users.module'

async function seedExamples(app: NestExpressApplication) {
  try {
    const examplesService = app.select(ExamplesModule).get(ExamplesService)

    const examples = await examplesService.findAll()
    if (examples.length > 10) return

    for (let i = 0; i <= 10; i++) {
      faker.seed(i + 1)
      const exampleDto = {
        name: faker.name.firstName(),
        number: faker.datatype.number({ min: 1 })
      }
      const example = plainToClass(CreateExampleDto, exampleDto)
      await validateOrReject(example)
      await examplesService.create(example)
    }
  } catch (err) {
    throw err
  }
}

async function seedUsers(app: NestExpressApplication) {
  try {
    const configService = app.get(ConfigService)
    const usersService = app.select(UsersModule).get(UsersService)

    async function createAdmin() {
      const adminEmail = configService.get('ADMIN_EMAIL')
      const adminExists = await usersService.findOneByEmail(adminEmail)
      if (adminExists) return

      const adminUserDto = {
        email: adminEmail,
        password: 'admin',
        roles: ['admin']
      }
      const adminUser = plainToClass(CreateUserDto, adminUserDto)
      await validateOrReject(adminUser)
      await usersService.create(adminUser)
    }

    async function createUser() {
      const userEmail = 'user@example.com'
      const userExists = await usersService.findOneByEmail(userEmail)
      if (userExists) return

      const userDto = {
        email: 'user@example.com',
        password: 'user'
      }
      const user = plainToClass(CreateUserDto, userDto)
      await validateOrReject(user)
      await usersService.create(user)
    }

    await createAdmin()
    await createUser()
  } catch (err) {
    throw err
  }
}

export async function seed(app: NestExpressApplication) {
  try {
    await seedExamples(app)
    await seedUsers(app)
  } catch (err) {
    throw err
  }
}
