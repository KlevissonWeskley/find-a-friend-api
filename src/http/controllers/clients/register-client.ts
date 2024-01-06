import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '../../../use-cases/errors/User-already-exists-error'
import { makeRegisterClientUseCase } from '../../../use-cases/factories/make-register-client-use-case'

export async function registerClient(request: FastifyRequest, reply: FastifyReply) {
    const registerClientBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),  
        password: z.string().min(6)
    })

    const {  
        name,
        email,
        password
     } = registerClientBodySchema.parse(request.body)

     try {
        const registerClientUseCase = makeRegisterClientUseCase()

        await registerClientUseCase.execute({
            name,
            email,
            password
        })
     } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
     }

     return reply.status(201).send()
}