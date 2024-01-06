import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/User-already-exists-error'
import { InMemoryClientsRepository } from '../repositories/in-memory/in-memory-clients-repository'
import { RegisterClientUseCase } from './register-client'

describe('Register Client Use Case', () => {
    test('should be able to register a client', async () => {
        const clientsRepository = new InMemoryClientsRepository()
        const sut = new RegisterClientUseCase(clientsRepository)

        const { client } = await sut.execute({
            name: 'client 1',
            email: 'client@gmail.com',
            password: '123456'
        })

        expect(client.id).toEqual(expect.any(String))
    })

    test('should hash client password upon registration', async () => {
        const clientsRepository = new InMemoryClientsRepository()
        const sut = new RegisterClientUseCase(clientsRepository)

        const { client } = await sut.execute({
            name: 'client 1',
            email: 'client@gmail.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare('123456', client.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    test('should not be able to register with same email twice', async () => {
        const clientsRepository = new InMemoryClientsRepository()
        const sut = new RegisterClientUseCase(clientsRepository)

        const email = 'client@gmail.com'

        await sut.execute({
            name: 'client 1',
            email,
            password: '123456'
        })

        await expect(() => 
            sut.execute({
                name: 'client 1',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})