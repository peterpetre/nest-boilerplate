import util from 'util'
import { exec } from 'child_process'

const execPromise = util.promisify(exec)
jest.setTimeout(3 * 60 * 1000) // NOTE: 3 min

global.beforeAll(() => execPromise('npm run start:docker'))
global.afterAll(() => execPromise('npm run kill:docker'))
