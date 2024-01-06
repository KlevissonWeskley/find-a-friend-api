import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { ClientsRepository } from '../clients-repository'

export class PrismaClientsRepository implements ClientsRepository {
    async create(data: Prisma.ClientCreateInput) {
        const client = await prisma.client.create({
            data,
        })
        
        return client
    }
    
    async findByEmail(email: string) {
        const client = await prisma.client.findUnique({
            where: {
                email,
            }
        })

        return client
    }
}