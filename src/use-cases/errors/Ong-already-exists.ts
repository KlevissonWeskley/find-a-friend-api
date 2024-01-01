export class OngAlreadyExists extends Error {
    constructor() {
        super('Ong already exists.')
    }
}