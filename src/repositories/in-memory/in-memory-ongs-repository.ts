import { Ong, Prisma, Role } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { OngsRepository } from '../ongs-repository'

export class InMemoryOngsRepository implements OngsRepository {
    public items: Ong[] = []
    
    async create(data: Prisma.OngCreateInput) {
        const ong = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            city: data.city,
            address: data.address,
            whatsapp: data.whatsapp,
            password_hash: data.password_hash,
            role: 'ADMIN' as Role,
            created_at: new Date()
        }

        this.items.push(ong)
        
        return ong
    }

    async findByEmail(email: string) {
        const ong = this.items.find(item => item.email === email)

        if (!ong) {
            return null
        }

        return ong
    }

}