import { AbstractPipe } from './abstract.pipe'

export class TrimPipe extends AbstractPipe {
  except() {
    return [
      'password',
      'passwordConfirmation',
      'newPassword',
      'newPasswordConfirmation'
    ]
  }

  protected transformValue(value: any) {
    // NOTE: trim spaces from start and end, replace multiple spaces with one
    return typeof value === 'string'
      ? value.trim().replace(/\s\s+/g, ' ')
      : value
  }
}
