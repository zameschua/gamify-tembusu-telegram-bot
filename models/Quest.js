export default class Quest {
  constructor(name, points) {
    this.name = name;
    this.points = points;
  }

  getPoints() {
    return this.points;
  }

  getName() {
    return this.name;
  }
}
