import { FastifyInstance } from 'fastify'
import { registerClient } from './register-client'
import { authenticateClient } from './authenticate-client'

export async function clientsRoutes(app: FastifyInstance) {
    app.post('/clients', registerClient)
    app.post('/sessions/clients', authenticateClient)
}