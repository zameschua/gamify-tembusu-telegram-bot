/**
 * Refer to the Telegram Bot API at https://github.com/yagop/node-telegram-bot-api
 */

import Persons from './models/Persons';
import TelegramBot from 'node-telegram-bot-api';
require('dotenv').config(); // For storing our Telegram API token in .env file

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.token, {polling: true});
const persons = new Persons();

/**
 * Matches /start command
 * Creates a Person object and adds it to our Persons controller
 */
bot.onText(/\/start/, (msg) => {

  const userId = msg.from.id;
  const name = msg.chat.first_name;
  
  // Add new user to our 'database'
  persons.createPerson(name, userId);
  console.log(persons.getPersonById(userId));

  bot.sendMessage(userId,`
        Hi ${name}! Welcome to Gamify Tembusu. Scan QR codes around campus to accumulate points!
        `);
});
