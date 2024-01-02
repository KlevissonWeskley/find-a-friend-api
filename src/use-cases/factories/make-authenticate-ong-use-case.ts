import { PrismaOngsRepository } from '../../repositories/prisma/prisma-ongs-repository'
import { AuthenticateOngUseCase } from '../authenticate-ong'

export function makeAuthenticateOngUseCase() {
    const prismaOngsRepository = new PrismaOngsRepository()
    const authenticateOngUseCase = new AuthenticateOngUseCase(prismaOngsRepository)

    return authenticateOngUseCase
}   