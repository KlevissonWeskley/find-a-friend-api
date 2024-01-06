import { Client, Prisma, Role } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ClientsRepository } from '../clients-repository'

export class InMemoryClientsRepository implements ClientsRepository {
    public items: Client[] = []
    
    async create(data: Prisma.ClientCreateInput) {
        const client = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            role: 'MEMBER' as Role,
            created_at: new Date()
        }

        this.items.push(client)

        return client
    }

    async findByEmail(email: string) {
        const client = this.items.find(item => item.email === email)

        if (!client) {
            return null
        }

        return client
    }

}