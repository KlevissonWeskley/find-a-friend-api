import { FastifyInstance } from 'fastify'
import { verifyUserRole } from '../../middlewares/verify-user-role'
import { registerPet } from './register-pet'
import { listPetsByCity } from './list-pets-by-city'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/petsInMyCity', listPetsByCity)
    app.post('/pets', { onRequest: [verifyUserRole('ADMIN')] }, registerPet)
}