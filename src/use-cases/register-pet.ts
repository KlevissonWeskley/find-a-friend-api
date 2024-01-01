import { Pet } from '@prisma/client'
import { PetsRepository } from '../repositories/pets-repository'

interface RegisterPetUseCaseRequest {
    name: string
    about: string
    age: string
    size: string
    ong_id: string
}

interface RegisterPetUseCaseResponse {
    pet: Pet
}

export class RegisterPetUseCase {
    constructor(private petsRepository: PetsRepository) {}

    async execute(
        { 
            name, 
            about, 
            age, 
            size, 
            ong_id 
        }: RegisterPetUseCaseRequest): Promise <RegisterPetUseCaseResponse> 
    {
        
        const pet = await this.petsRepository.create({
            name,
            about,
            age,
            size,
            ong_id
        })

        return {
            pet
        }
    } 
}