import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '../../../use-cases/errors/Invalid-credentials-error'
import { makeAuthenticateClientUseCase } from '../../../use-cases/factories/make-authenticate-client-use-case'

export async function authenticateClient(request: FastifyRequest, reply: FastifyReply) {
    const authenticateClientBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateClientBodySchema.parse(request.body)

    try {
        const authenticateClientUseCase = makeAuthenticateClientUseCase()

        const { client } = await authenticateClientUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign(
            {
                role: client.role
            },
            {
                sign: {
                    sub: client.id
                }
            }
        )

        const refreshToken = await reply.jwtSign(
            {
                role: client.role
            },
            {
                sign: {
                    sub: client.id,
                    expiresIn: '7d'
                }
            }
        )

        
        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true
            })
            .status(200)
            .send({
                token
            })
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }
}