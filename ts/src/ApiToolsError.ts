
import { Context } from './Context'


class ApiToolsError extends Error {

  isApiToolsError = true

  sdk = 'ApiTools'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ApiToolsError
}

