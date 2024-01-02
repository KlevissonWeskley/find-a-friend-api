import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateOngUseCase } from '../../use-cases/factories/make-authenticate-ong-use-case'
import { InvalidCredentialsError } from '../../use-cases/errors/Invalid-credentials-error'

export async function authenticateOng(request: FastifyRequest, reply: FastifyReply) {
    const authenticateOngBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password } = authenticateOngBodySchema.parse(request.body)

    try {
        const authenticateOngUseCase = makeAuthenticateOngUseCase()

        const { ong } = await authenticateOngUseCase.execute({
            email,
            password
        })

        const token = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: ong.id
                }
            }
        )

        const refreshToken = await reply.jwtSign(
            {},
            {
                sign: {
                    sub: ong.id,
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