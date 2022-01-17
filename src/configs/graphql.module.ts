import { Module } from '@nestjs/common'
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    NestGraphQLModule.forRoot({
      autoSchemaFile: true
    })
  ]
})
export class GraphQLModule {}
