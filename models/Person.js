export default class Person {
    constructor(name, telegramId) {
        this.name = name;
        this.telegramId = telegramId;
    }

    getPoints() {
        return this.points;
    };

    addPoints(points) {
        this.points += points;
    };
}