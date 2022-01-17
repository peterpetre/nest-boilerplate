import {
  Fieldname,
  Originalname,
  Encoding,
  Mimetype,
  Destination,
  Filename,
  Path,
  Size
} from '../entities/file.entity'

export class CreateFileDto {
  @Fieldname()
  fieldname: string

  @Originalname()
  originalname: string

  @Encoding()
  encoding: string

  @Mimetype()
  mimetype: string

  @Destination()
  destination: string

  @Filename()
  filename: string

  @Path()
  path: string

  @Size()
  size: number
}
