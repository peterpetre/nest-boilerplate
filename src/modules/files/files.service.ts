import { Injectable } from '@nestjs/common'
import { wrap } from '@mikro-orm/core'
import fs from 'fs/promises'
import { FileRepository } from './entities/file.entity'
import { CreateFileDto } from './dto/create-file.dto'
import { RenameFileDto } from './dto/rename-file.dto'

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FileRepository) {}

  async createMultiple(filesDto: Array<CreateFileDto>) {
    try {
      const files = Object.values(filesDto).map((fileDto: CreateFileDto) =>
        this.fileRepository.create(fileDto)
      )
      await this.fileRepository.persistAndFlush(files)
      return files
    } catch (err) {
      throw err
    }
  }

  async createSingle(fileDto: CreateFileDto) {
    try {
      const file = this.fileRepository.create(fileDto)
      await this.fileRepository.persistAndFlush(file)
      return file
    } catch (err) {
      throw err
    }
  }

  async findAll() {
    return this.fileRepository.findAll()
  }

  async findOne(id: number) {
    return this.fileRepository.findOne(id)
  }

  async rename(id: number, renameFileDto: RenameFileDto) {
    try {
      const file = await this.fileRepository.findOne(id)
      if (!file) return
      const originalname = file.originalname.replace(
        file.originalname.split('.')[0],
        renameFileDto.name
      )
      wrap(file).assign({ originalname })
      await this.fileRepository.persistAndFlush(file)
      return file
    } catch (err) {
      throw err
    }
  }

  async remove(id: number) {
    try {
      const file = await this.fileRepository.findOne(id)
      if (!file) return
      await fs.unlink(file.path)
      await this.fileRepository.removeAndFlush(file)
      return file
    } catch (err) {
      throw err
    }
  }
}
