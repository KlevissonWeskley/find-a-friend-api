import { Ong } from '@prisma/client'
import { OngsRepository } from '../repositories/ongs-repository'
import { hash } from 'bcryptjs'
import { OngAlreadyExists } from './errors/Ong-already-exists'

interface RegisterOngUseCaseRequest {
    name: string
    email: string
    password: string
    city: string
    address: string
    whatsapp: string
}

interface RegisterOngUseCaseResponse {
    ong: Ong
}

export class RegisterOngUseCase {
    constructor(private ongsRepository: OngsRepository) {}

    async execute(
        { 
            name, 
            email, 
            password, 
            city, 
            address,
            whatsapp 
        }: RegisterOngUseCaseRequest): Promise <RegisterOngUseCaseResponse> 
    {
        const password_hash = await hash(password, 6)

        const ongWithSameEmail = await this.ongsRepository.findByEmail(email)

        if (ongWithSameEmail) {
            throw new OngAlreadyExists()
        }

        const ong = await this.ongsRepository.create({
            name,
            email, 
            password_hash, 
            city, 
            address,
            whatsapp 
        })

        return {
            ong
        }
    } 
}