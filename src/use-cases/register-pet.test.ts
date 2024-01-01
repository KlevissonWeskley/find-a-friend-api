import { InMemoryPetsRepository } from '../repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'

describe('Register Pet Use Case', () => {
    const petsRepository = new InMemoryPetsRepository()
    const sut = new RegisterPetUseCase(petsRepository)
    
    test('should be able to register a s', async () => {
        const { pet } = await sut.execute({
            name: 'Bob',
            about: 'Bob é um cachorro da raça pitbull',
            age: '5',
            ong_id: 'ong-1',
            size: '1.00'
        })

        expect(pet.id).toEqual(expect.any(String))
    })
})