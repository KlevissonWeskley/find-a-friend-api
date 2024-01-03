import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findPetsByCity(city: string): Promise<Pet[] | null>
}