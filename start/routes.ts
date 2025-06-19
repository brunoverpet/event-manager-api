/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')

router
  .get('/', async () => {
    return {
      hello: 'brubo',
    }
  })
  .use(middleware.auth())

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router
  .group(() => {
    router.get('/me', [UsersController, 'me'])
    router.put('/edit', [UsersController, 'edit'])
    router.delete('/delete', [UsersController, 'delete'])
  })
  .use(middleware.auth())
