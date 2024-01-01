import { compare } from 'bcryptjs'
import { InMemoryOngsRepository } from '../repositories/in-memory/in-memory-ongs-repository'
import { RegisterOngUseCase } from './register-ong'
import { OngAlreadyExists } from './errors/Ong-already-exists'

describe('Register Ong Use Case', () => {
    test('should be able to register a ong', async () => {
        const ongsRepository = new InMemoryOngsRepository()
        const sut = new RegisterOngUseCase(ongsRepository)

        const { ong } = await sut.execute({
            name: 'Ong 1',
            address: 'Rua 1',
            city: 'Cidade 1',
            email: 'ong@gmail.com',
            password: '123456',
            whatsapp: '89 99999999'
        })

        expect(ong.id).toEqual(expect.any(String))
    })

    test('should hash ong password upon registration', async () => {
        const ongsRepository = new InMemoryOngsRepository()
        const sut = new RegisterOngUseCase(ongsRepository)

        const { ong } = await sut.execute({
            name: 'Ong 1',
            address: 'Rua 1',
            city: 'Cidade 1',
            email: 'ong2@gmail.com',
            password: '123456',
            whatsapp: '89 99999999'
        })

        const isPasswordCorrectlyHashed = await compare('123456', ong.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    test('should not be able to register with same email twice', async () => {
        const ongsRepository = new InMemoryOngsRepository()
        const sut = new RegisterOngUseCase(ongsRepository)

        const email = 'ong@gmail.com'

        await sut.execute({
            name: 'Ong 1',
            address: 'Rua 1',
            city: 'Cidade 1',
            email,
            password: '123456',
            whatsapp: '89 99999999'
        })

        await expect(() => 
            sut.execute({
                name: 'Ong 1',
                address: 'Rua 1',
                city: 'Cidade 1',
                email,
                password: '123456',
                whatsapp: '89 99999999'
            })
        ).rejects.toBeInstanceOf(OngAlreadyExists)
    })
})