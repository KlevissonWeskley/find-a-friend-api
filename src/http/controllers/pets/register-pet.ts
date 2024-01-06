import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '../../../use-cases/factories/make-register-pet-use-case'

export async function registerPet(request: FastifyRequest, reply: FastifyReply) {
    const registerPetBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.string(),
        size: z.string(),
        ong_id: z.string()
    })

    const { name, about, age, size, ong_id } = registerPetBodySchema.parse(request.body)

    try {
        const registerPetUseCase = makeRegisterPetUseCase()

        await registerPetUseCase.execute({
            name,
            about,
            age, 
            size,
            ong_id
        })
    } catch (err) {
        throw err
    }

    return reply.status(201).send()
}