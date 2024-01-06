import { Pet } from '@prisma/client'
import { PetsRepository } from '../../repositories/pets-repository'

interface ListPetsByCityUseCaseRequest {
    city: string
}

interface ListPetsByCityUseCaseResponse {
    pets: Pet[] | null
}

export class ListPetsByCityUseCase {
    constructor(
        private petsRepository: PetsRepository,
    ) {}

    async execute({ 
        city,
    }: ListPetsByCityUseCaseRequest): Promise<ListPetsByCityUseCaseResponse> {
        const pets = await this.petsRepository.findPetsByCity(city)

        return {
            pets
        }
    }
}