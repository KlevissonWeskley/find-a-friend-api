import { PrismaOngsRepository } from '../../repositories/prisma/prisma-ongs-repository'
import { RegisterOngUseCase } from '../register-ong'

export function makeRegisterOngUseCase() {
    const prismaOngsRepository = new PrismaOngsRepository()
    const registerOngUseCase = new RegisterOngUseCase(prismaOngsRepository)

    return registerOngUseCase
}