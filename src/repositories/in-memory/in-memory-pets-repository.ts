import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []
    
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = {
            id: randomUUID(),
            name: data.name,
            about: data.about,
            age: data.age,
            size: data.size,
            ong_id: randomUUID(),
            created_at: new Date()
        }

        this.items.push(pet)

        return pet
    }

    async findPetsByCity(city: string) {
        return null
    }
}