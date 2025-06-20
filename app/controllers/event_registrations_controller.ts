import type { HttpContext } from '@adonisjs/core/http'
import EventsRegistration from '#models/events_registration'
import Event from '#models/event'
import db from '@adonisjs/lucid/services/db'

export default class EventRegistrationsController {
  async register({ auth, request, response }: HttpContext) {
    const userId = auth.getUserOrFail().id
    const eventId = request.param('id')

    const event = await Event.find(eventId)

    if (!event)
      return response
        .status(404)
        .json({ message: "Cet évènement n'est actuellement pas disponible ou n'existe pas." })

    const findIfRegister = await EventsRegistration.query()
      .where('event_id', eventId)
      .andWhere('user_id', userId)
      .first()

    if (findIfRegister)
      return response.status(409).json({ message: 'Vous êtes déjà inscrit à cet événement.' })

    const totalResult = await db
      .from('events_registrations')
      .where('event_id', eventId)
      .count('* as total')

    const totalRegistered = Number(totalResult[0].total)

    if (totalRegistered >= event.maxAttendees)
      return response.status(409).json({
        message: 'Cet événement est complet. Aucune inscription supplémentaire n’est possible.',
      })

    await EventsRegistration.create({ eventId, userId })
    return response.status(201).json({ message: 'Vous avez bien été inscrit à cet événement.' })
  }
}
