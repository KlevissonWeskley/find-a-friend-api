import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterOngUseCase } from '../../../use-cases/factories/make-register-ong-use-case'
import { UserAlreadyExistsError } from '../../../use-cases/errors/User-already-exists-error'

export async function registerOng(request: FastifyRequest, reply: FastifyReply) {
    const registerOngBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        city: z.string(),
        address: z.string(),      
        whatsapp: z.string(),      
        password: z.string().min(6)
    })

    const {  
        name,
        email,
        password,
        city,
        address,
        whatsapp
     } = registerOngBodySchema.parse(request.body)

     try {
        const registerOngUseCase = makeRegisterOngUseCase()

        await registerOngUseCase.execute({
            name,
            email,
            password,
            city,
            address,
            whatsapp
        })
     } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message })
        }

        throw err
     }

     return reply.status(201).send()
}