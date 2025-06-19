import type { HttpContext } from '@adonisjs/core/http'
import { registerValidation } from '#validators/register'
import User from '#models/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const user = await request.validateUsing(registerValidation)
    const searchUser = await User.findBy({ email: user.email })
    if (searchUser)
      return response.status(400).json({ message: 'Ce mail est déjà associé à un compte.' })
    await User.create(user)
    return response.status(201).json({ message: 'Votre compte a bien été créer.' })
  }

  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    if (user.isDeleted)
      return response
        .status(403)
        .json({ message: 'Ce compte a été supprimé et vous ne pouvez donc plus vous y connecter.' })

    await auth.use().login(user)

    response.redirect('/')
  }
}
