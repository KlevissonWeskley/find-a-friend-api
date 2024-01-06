import { Client } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/User-already-exists-error'
import { ClientsRepository } from '../repositories/clients-repository'

interface RegisterClientUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterClientUseCaseResponse {
    client: Client
}

export class RegisterClientUseCase {
    constructor(private clientsRepository: ClientsRepository) {}

    async execute(
        { 
            name, 
            email, 
            password
        }: RegisterClientUseCaseRequest): Promise <RegisterClientUseCaseResponse> 
    {
        const password_hash = await hash(password, 6)

        const clientWithSameEmail = await this.clientsRepository.findByEmail(email)

        if (clientWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const client = await this.clientsRepository.create({
            name,
            email, 
            password_hash
        })

        return {
            client
        }
    } 
}