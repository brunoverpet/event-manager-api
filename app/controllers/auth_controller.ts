import type { HttpContext } from '@adonisjs/core/http'
import { registerValidation } from '#validators/register'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const user = await request.validateUsing(registerValidation)
    await User.create(user)
    return response.status(201).json({ message: 'Votre compte a bien été créer.' })
  }
}
