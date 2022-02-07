import { Example } from '../entities/example.entity'

export function createExample(id: number, name: string) {
  const example = new Example()
  example.id = id
  example.name = name
  return example
}
