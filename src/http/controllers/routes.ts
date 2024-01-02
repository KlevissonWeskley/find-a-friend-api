import { FastifyInstance } from 'fastify'
import { registerOng } from './register-ong'
import { authenticateOng } from './authenticate-ong'
import { verifyJWT } from '../middlewares/verify-jwt'
import { registerPet } from './register-pet'

export async function routes(app: FastifyInstance) {
    app.post('/ongs', registerOng)
    app.post('/pets', { onRequest: [verifyJWT] }, registerPet)

    app.post('/sessions', authenticateOng)
}