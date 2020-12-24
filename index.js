process.env.NTBA_FIX_319 = 1;
let cheerio = require("cheerio");
const request = require('request-promise');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
var config = require("config").config;
const token = process.env.BT_TOKEN;
const appId = process.env.BT_APPID;
const bot = new TelegramBot(token, {
  polling: true
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const options = {
    method: "GET",
    uri: "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=" + appId + "&lang=ru&q=" + msg.text
  };
  options.uri = encodeURI(options.uri);
  processing(chatId, options)
});

function processing(chatId, options) {
  request(options)
    .then(function (res) {
      let weather = JSON.parse(res),
        temp = weather.main.temp - 273.15,
        feels_like = weather.main.feels_like - 273.15,
        pressure = weather.weather[0].description,
        message = "ВАШ ГОРОД - " + weather.name + 
        "\n\n Не все могут смотреть в завтрашний день!!!!!!\n\n" +
        "Температура будет " + temp.toFixed(1) +
        "\nНО Ощущается как " + feels_like.toFixed(1) +
        "\nНе знаю зачем тебе оно, но на улице " + pressure;
        
      bot.sendMessage(chatId, message);
    })
    .catch(function (err) {
      console.log(err)
      bot.sendMessage(chatId, 'Харош писать что попало')
    })
}