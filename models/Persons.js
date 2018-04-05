import Person from './Person';

/**
 * Stores all persons in a Javascript object
 * key:value = telegramId:Person
 */
export default class Persons {
    constructor() {
        this.personsHashmap = {};
    }

    getPersonById(telegramId) {
        return this.personsHashmap[telegramId];
    };

    createPerson(name, telegramId) {
        let newPerson = new Person(name, telegramId);
        
        this.personsHashmap[telegramId] = newPerson;
    }
}