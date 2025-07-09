import vine from '@vinejs/vine'

export const registerValidation = vine.compile(
  vine.object({
    firstname: vine.string().trim().minLength(3),
    lastname: vine.string().trim().minLength(3),
    email: vine.string().trim().minLength(3).email(),
    password: vine.string().trim().minLength(8).maxLength(15),
  })
)
