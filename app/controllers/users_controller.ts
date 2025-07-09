import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { editUserValidation } from '#validators/user'

export default class UsersController {
  async me({ auth, response }: HttpContext) {
    const user: User = auth.getUserOrFail()
    return response.status(200).json(user.$attributes)
  }

  async edit({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(editUserValidation)
    user.merge(payload)

    if (!user.$isDirty)
      return response.status(200).json({ message: "Aucune information n'a été changé." })

    await user.save()
    return response.status(200).json({ message: 'Vos informations ont bien été enregistré.' })
  }

  async delete({ auth, response }: HttpContext) {
    const user: User = auth.getUserOrFail()
    user.isDeleted = true
    await user.save()

    return response.status(200).json({ message: 'Votre compte a bien été supprimé.' })
  }
}
