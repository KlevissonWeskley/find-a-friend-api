import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '../../lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = await prisma.pet.create({
            data,
        })

        return pet
    }

    async findPetsByCity(city: string) {
        const pets = await prisma.pet.findMany({
            where: {
                ongs: {
                    city
                }
            },
        })

        return pets
    }
}