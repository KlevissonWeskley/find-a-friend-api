import { hash } from 'bcryptjs'
import { InMemoryOngsRepository } from '../repositories/in-memory/in-memory-ongs-repository'
import { AuthenticateOngUseCase } from './authenticate-ong'
import { InvalidCredentialsError } from './errors/Invalid-credentials-error'

describe('Register Ong Use Case', () => {
    test('should be able to register a ong', async () => {
        const ongsRepository = new InMemoryOngsRepository()
        const sut = new AuthenticateOngUseCase(ongsRepository)

        await ongsRepository.create({
            name: 'Ong 1',
            address: 'Rua 1',
            city: 'Cidade 1',
            email: 'ong@gmail.com',
            password_hash: await hash('123456', 6),
            whatsapp: '89 99999999',
        })

        const { ong } = await sut.execute({
            email: 'ong@gmail.com',
            password: '123456',
        })

        expect(ong.id).toEqual(expect.any(String))
    })
    
    it('should not be able to authenticate with wrong password', async () => {
        const ongsRepository = new InMemoryOngsRepository()
        const sut = new AuthenticateOngUseCase(ongsRepository)

        ongsRepository.create({
            name: 'Ong 1',
            address: 'Rua 1',
            city: 'Cidade 1',
            email: 'ong@gmail.com',
            password_hash: await hash('123456', 6),
            whatsapp: '89 99999999',
        })

        await expect(() => 
            sut.execute({
                email: 'ong@gmail.com',
                password: '123123',
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})