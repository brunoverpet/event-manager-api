import vine from '@vinejs/vine'

export const editUserValidation = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(3).optional(),
    lastname: vine.string().trim().minLength(3).optional(),
    email: vine.string().trim().minLength(3).email().optional(),
    password: vine.string().trim().minLength(8).maxLength(15).optional(),
  })
)
