import { Injectable } from '@nestjs/common'
import { wrap } from '@mikro-orm/core'
import { UserRepository } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    return this.userRepository.findAll()
  }

  async findOne(id: number) {
    return this.userRepository.findOne(id)
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOne({ email })
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto)
      await this.userRepository.persistAndFlush(user)
      return user
    } catch (err) {
      throw err
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne(id)
      if (!user) return
      wrap(user).assign(updateUserDto)
      await this.userRepository.persistAndFlush(user)
      return user
    } catch (err) {
      throw err
    }
  }

  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne(id)
      if (!user) return
      await this.userRepository.removeAndFlush(user)
      return user
    } catch (err) {
      throw err
    }
  }
}
