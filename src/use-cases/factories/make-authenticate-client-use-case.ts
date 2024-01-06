import { PrismaClientsRepository } from '../../repositories/prisma/prisma-clients-repository'
import { AuthenticateClientUseCase } from '../authenticate-client'

export function makeAuthenticateClientUseCase() {
    const prismaClientsRepository = new PrismaClientsRepository()
    const authenticateClientUseCase = new AuthenticateClientUseCase(prismaClientsRepository)

    return authenticateClientUseCase
}   