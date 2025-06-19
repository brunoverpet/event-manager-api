import vine from '@vinejs/vine'

export const createEventValidation = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3),
    description: vine.string().trim().minLength(8),
    location: vine.string().trim().minLength(3),
    eventDate: vine.string().trim(),
    maxAttendees: vine.number(),
  })
)
