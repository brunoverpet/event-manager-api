import type { HttpContext } from '@adonisjs/core/http'
import { createEventValidation, updateEventValidation } from '#validators/event'
import Event from '#models/event'

export default class EventsController {
  async create({ auth, request, response }: HttpContext) {
    const event = await request.validateUsing(createEventValidation)
    await Event.create({ authorId: auth.getUserOrFail().id, ...event })

    return response.status(201).json({ message: `L'évènement à bien été créer` })
  }

  async getEvents({ response }: HttpContext) {
    const events = await Event.all()
    if (events.length === 0)
      return response.status(404).json({ message: "Aucun événement n'est actuellement disponible" })
    return response.status(200).json({ events })
  }

  async getEventById({ request, response }: HttpContext) {
    const id = request.param('id')
    const event = await Event.find(id)

    if (!event)
      return response
        .status(404)
        .json({ message: "Cet évènement n'est actuellement pas disponible ou n'existe pas." })

    return response.status(200).json({ event })
  }

  async update({ request, response }: HttpContext) {
    const id = request.param('id')
    const event = await Event.find(id)
    const payload = await request.validateUsing(updateEventValidation)

    if (!event)
      return response
        .status(404)
        .json({ message: "Cet évènement n'est actuellement pas disponible ou n'existe pas." })

    event.merge(payload)

    if (!event.$isDirty)
      return response.status(200).json({ message: "Aucune modification n'a été effectué." })

    await event.save()

    return response.status(200).json({ message: "L'évènement a bien été modifié", event })
  }
}
