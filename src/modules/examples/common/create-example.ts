import { ExampleEntity } from '../entities/example.entity'

export function createExample(id: number, name: string) {
  const example = new ExampleEntity()
  example.id = id
  example.name = name
  return example
}
