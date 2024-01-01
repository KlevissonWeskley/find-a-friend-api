import { Ong } from '@prisma/client'
import { OngsRepository } from '../repositories/ongs-repository'
import { InvalidCredentials } from './errors/Invalid-credentials'
import { compare } from 'bcryptjs'

interface AuthenticateOngUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateOngUseCaseResponse {
    ong: Ong
}

export class AuthenticateOngUseCase {
    constructor(private ongsRepository: OngsRepository) {}

    async execute(
        { 
            email, 
            password 
        }: AuthenticateOngUseCaseRequest): Promise <AuthenticateOngUseCaseResponse> 
    {
        const ong = await this.ongsRepository.findByEmail(email)

        if (!ong) {
            throw new InvalidCredentials()
        }

        const doesPasswordMatches = await compare(password, ong.password_hash)
    
        if (!doesPasswordMatches) {
            throw new InvalidCredentials()
        }

        return {
            ong
        }
    } 
}