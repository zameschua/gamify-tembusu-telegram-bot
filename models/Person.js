export default class Person {
  constructor(name, telegramId) {
    this.name = name;
    this.telegramId = telegramId;
    this.points = 0;
  }

  getName() {
    return this.name;
  }

  getPoints() {
    return this.points;
  }

  addPoints(points) {
    this.points += points;
  }
}
