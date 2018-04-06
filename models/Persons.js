import Person from "./Person";

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
  }

  createPerson(name, telegramId) {
    let newPerson = new Person(name, telegramId);
    this.personsHashmap[telegramId] = newPerson;
  }

  getTopScorers(numTopScorers) {
    const personsArray = Object.entries(this.personsHashmap);
    personsArray.sort((a, b) => {
      return b[1].getPoints() - a[1].getPoints();
    });
    return personsArray.slice(0, numTopScorers).map(entry => entry[1]);
  }
}
