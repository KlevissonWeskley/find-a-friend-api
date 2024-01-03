import { FastifyInstance } from 'fastify'
import { registerOng } from './register-ong'
import { authenticateOng } from './authenticate-ong'
import { verifyJWT } from '../middlewares/verify-jwt'
import { registerPet } from './register-pet'
import { listPetsByCity } from './list-pets-by-city'

export async function routes(app: FastifyInstance) {
    app.get('/petsInMyCity', listPetsByCity)

    app.post('/ongs', registerOng)
    app.post('/pets', { onRequest: [verifyJWT] }, registerPet)

    app.post('/sessions', authenticateOng)
}