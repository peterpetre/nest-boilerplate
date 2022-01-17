import { Injectable } from '@nestjs/common'
import { wrap } from '@mikro-orm/core'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { lastValueFrom } from 'rxjs'
import { MailService } from '@/configs/mail.module'
import { ExampleRepository } from './entities/example.entity'
import { CreateExampleDto } from './dto/create-example.dto'
import { UpdateExampleDto } from './dto/update-example.dto'

@Injectable()
export class ExamplesService {
  constructor(
    private readonly exampleRepository: ExampleRepository,
    private readonly httpService: HttpService,
    private readonly mailService: MailService
  ) {}

  // CRUD
  async create(createExampleDto: CreateExampleDto) {
    try {
      const example = this.exampleRepository.create(createExampleDto)
      await this.exampleRepository.persistAndFlush(example)
      return example
    } catch (err) {
      throw err
    }
  }

  async findAll() {
    return this.exampleRepository.findAll()
  }

  async findOne(id: number) {
    return this.exampleRepository.findOne(id)
  }

  async update(id: number, updateExampleDto: UpdateExampleDto) {
    try {
      const example = await this.exampleRepository.findOne(id)
      if (!example) return
      wrap(example).assign(updateExampleDto)
      await this.exampleRepository.persistAndFlush(example)
      return example
    } catch (err) {
      throw err
    }
  }

  async remove(id: number) {
    try {
      const example = await this.exampleRepository.findOne(id)
      if (!example) return
      await this.exampleRepository.removeAndFlush(example)
      return example
    } catch (err) {
      throw err
    }
  }

  // MORE
  async callExternalApi(): Promise<AxiosResponse<any, any>> {
    try {
      const result = await lastValueFrom(
        this.httpService.get('https://jsonplaceholder.typicode.com/posts')
      )
      return result.data
    } catch (err) {
      throw err
    }
  }

  async callExternalApiV2(): Promise<AxiosResponse<any, any>> {
    try {
      const result = await lastValueFrom(
        this.httpService.get(
          'https://jsonplaceholder.typicode.com/posts?userId=1'
        )
      )
      return result.data
    } catch (err) {
      throw err
    }
  }

  async sendMail() {
    try {
      const options = {
        template: 'welcome',
        message: { to: 'user@example.com' },
        locals: { locale: 'en', name: 'Alice' }
      }
      const result = await this.mailService.sendMail(options)
      console.log(result)
      return result
    } catch (err) {
      throw err
    }
  }
}
