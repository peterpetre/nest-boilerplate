import { NameProperty, NumberProperty } from '../entities/example.entity'

export class CreateExampleDto {
  @NameProperty()
  name: string

  @NumberProperty()
  number?: number
}
