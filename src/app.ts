import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'
import { ZodError } from 'zod'
import { ongsRoutes } from './http/controllers/ongs/routes'
import { petsRoutes } from './http/controllers/pets/routes'
import { clientsRoutes } from './http/controllers/clients/routes'

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '10m'
    }
})

app.register(fastifyCookie)

app.register(ongsRoutes)
app.register(clientsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({ message: 'Validation error', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error.' })
})