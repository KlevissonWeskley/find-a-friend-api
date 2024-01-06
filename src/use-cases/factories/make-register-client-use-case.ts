import { PrismaClientsRepository } from '../../repositories/prisma/prisma-clients-repository'
import { RegisterClientUseCase } from '../register-client'

export function makeRegisterClientUseCase() {
    const prismaClientsRepository = new PrismaClientsRepository()
    const registerClientUseCase = new RegisterClientUseCase(prismaClientsRepository)

    return registerClientUseCase
}