import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { ListPetsByCityUseCase } from '../list-pets-by-city'

export function makeListPetsByCityUseCase() {
    const prismaPetsRepository = new PrismaPetsRepository()
    const listPetsByCityUseCase = new ListPetsByCityUseCase(prismaPetsRepository)

    return listPetsByCityUseCase
}