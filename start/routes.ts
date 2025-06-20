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

const EventsController = () => import('#controllers/events_controller')

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
    // Users Routes
    router.get('/me', [UsersController, 'me'])
    router.put('/edit', [UsersController, 'edit'])
    router.delete('/delete', [UsersController, 'delete'])

    // Events Routes
    router.post('/event', [EventsController, 'create'])
    router.get('/events', [EventsController, 'getEvents'])
    router.get('/events/:id', [EventsController, 'getEventById'])
  })
  .use(middleware.auth())
