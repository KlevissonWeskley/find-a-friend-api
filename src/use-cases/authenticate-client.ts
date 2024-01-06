import { Client } from '@prisma/client'
import { InvalidCredentialsError } from './errors/Invalid-credentials-error'
import { compare } from 'bcryptjs'
import { ClientsRepository } from '../repositories/clients-repository'

interface AuthenticateClientUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateClientUseCaseResponse {
    client: Client
}

export class AuthenticateClientUseCase {
    constructor(private clientsRepository: ClientsRepository) {}

    async execute(
        { 
            email, 
            password 
        }: AuthenticateClientUseCaseRequest): Promise <AuthenticateClientUseCaseResponse> 
    {
        const client = await this.clientsRepository.findByEmail(email)

        if (!client) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, client.password_hash)
    
        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return {
            client
        }
    } 
}