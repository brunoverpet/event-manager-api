import type { HttpContext } from '@adonisjs/core/http'
import { createEventValidation } from '#validators/event'
import Event from '#models/event'

export default class EventsController {
  async create({ auth, request, response }: HttpContext) {
    const event = await request.validateUsing(createEventValidation)
    await Event.create({ authorId: auth.getUserOrFail().id, ...event })

    return response.status(201).json({ message: `L'évènement à bien été créer` })
  }
}
