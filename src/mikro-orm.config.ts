import { Options } from '@mikro-orm/core'
import { Logger } from '@nestjs/common'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { DefaultConfig } from './default.config'
import path from 'path'

const logger = new Logger('MikroORM')

const config = {
  type: 'mysql',
  host: process.env.DB_HOST || DefaultConfig.DB_HOST,
  port: process.env.DB_PORT || DefaultConfig.DB_PORT,
  user: process.env.DB_USERNAME || DefaultConfig.DB_USERNAME,
  password: process.env.DB_PASSWORD || DefaultConfig.DB_PASSWORD,
  dbName: process.env.DB_NAME || DefaultConfig.DB_NAME,
  debug: true,
  highlighter: new SqlHighlighter(),
  logger: logger.log.bind(logger),
  entities: ['dist/modules/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],
  migrations: {
    path: path.join(__dirname, './migrations')
  }
} as Options

export default config
