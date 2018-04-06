/**
 * Refer to the Telegram Bot API at https://github.com/yagop/node-telegram-bot-api
 */

import Persons from "./models/Persons";
import Quests from "./models/Quests";
import TelegramBot from "node-telegram-bot-api";
import { extractPhoto, readQR } from "./utils/photo";
require("dotenv").config(); // For storing our Telegram API token in .env file

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.token, { polling: true });
const persons = new Persons();

/**
 * Matches /start command
 * Creates a Person object and adds it to our Persons controller
 */
bot.onText(/\/start/, msg => {
  const userId = msg.from.id;
  const name = msg.chat.first_name;

  // Add new user to our 'database'
  persons.createPerson(name, userId);
  console.log(persons.getPersonById(userId));

  bot.sendMessage(
    userId,
    `
        Hi ${name}! Welcome to Gamify Tembusu. Scan QR codes around campus to accumulate points!
        `
  );
});

bot.on("photo", msg => {
  const userId = msg.from.id;
  const person = persons.getPersonById(userId);

  if (!person) {
    const resMsg = "Please register by typing /start";
    bot.sendMessage(userId, resMsg);
    return;
  }

  extractPhoto(bot, msg).then(readQR).then(res => {
    const quest = Quests[res];
    if (!quest) {
      const resMsg = "Invalid code.";
      bot.sendMessage(userId, resMsg);
      return;
    }

    person.addPoints(quest.getPoints());
    const resMsg = `Congratulations! You have completed the quest ${quest.getName()} worth ${quest.getPoints()} points. You now have ${person.getPoints()} points.`;
    bot.sendMessage(userId, resMsg);
  });
});
