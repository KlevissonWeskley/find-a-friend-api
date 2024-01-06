import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/Invalid-credentials-error'
import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'
import { AuthenticateClientUseCase } from './authenticate-client'

describe('Authenticate Client Use Case', () => {
    test('should be able to authenticate a client', async () => {
        const clientsRepository = new InMemoryClientsRepository()
        const sut = new AuthenticateClientUseCase(clientsRepository)

        await clientsRepository.create({
            name: 'client 1',
            email: 'client@gmail.com',
            password_hash: await hash('123456', 6)        
        })

        const { client } = await sut.execute({
            email: 'client@gmail.com',
            password: '123456'
        })

        expect(client.id).toEqual(expect.any(String))
    })
    
    it('should not be able to authenticate with wrong password', async () => {
        const clientsRepository = new InMemoryClientsRepository()
        const sut = new AuthenticateClientUseCase(clientsRepository)

        clientsRepository.create({
            name: 'client 1',
            email: 'client@gmail.com',
            password_hash: await hash('123456', 6)        
        })

        await expect(() => 
            sut.execute({
                email: 'client@gmail.com',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})