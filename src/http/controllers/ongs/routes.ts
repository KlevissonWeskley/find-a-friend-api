import { FastifyInstance } from 'fastify'
import { registerOng } from './register-ong'
import { authenticateOng } from './authenticate-ong'

export async function ongsRoutes(app: FastifyInstance) {
    app.post('/ongs', registerOng)
    app.post('/sessions', authenticateOng)
}