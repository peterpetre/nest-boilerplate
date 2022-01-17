import { Options } from '@mikro-orm/core'
import { Logger } from '@nestjs/common'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import * as path from 'path'

const logger = new Logger('MikroORM')

const config = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  dbName: process.env.DB_NAME || 'main',
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
