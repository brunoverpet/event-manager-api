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
const EventRegistrationsController = () => import('#controllers/event_registrations_controller')

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const EventsController = () => import('#controllers/events_controller')

// Authentication Routes
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
    router.put('/events/:id', [EventsController, 'update'])
    router.delete('/events/:id', [EventsController, 'delete'])

    // Events Registration Routes
    router.post('/events/:id/register', [EventRegistrationsController, 'register'])
  })
  .use(middleware.auth())
