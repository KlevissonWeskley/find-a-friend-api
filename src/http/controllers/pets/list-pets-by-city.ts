import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError, z } from 'zod'
import { makeListPetsByCityUseCase } from '../../../use-cases/factories/make-list-pets-by-city'

export async function listPetsByCity(request: FastifyRequest, reply: FastifyReply) {
    const listPetsByCityQuerySchema = z.object({
        city: z.string(),
    })

    const { city } = listPetsByCityQuerySchema.parse(request.query)

    try {
        const listPetsByCityUseCase = makeListPetsByCityUseCase()

        const pets = await listPetsByCityUseCase.execute({
            city
        })

        return reply.status(200).send({ pets })
    } catch (err) {
        if (err instanceof ZodError) {
            return reply.status(400).send({ message: err.format() })
        }

        throw err
    }
}