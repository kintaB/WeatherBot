process.env.NTBA_FIX_319 = 1;
const request = require('request-promise');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.BT_TOKEN;
const appId = process.env.BT_APPID;
const bot = new TelegramBot(token, {
  polling: true
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  //Объект options отвечает за параметры запроса, который мы будем делать в дальнейшем
  const options = {
    method: "GET",
    uri: "http://api.openweathermap.org/data/2.5/weather?id=524901&appid=" + appId + "&lang=ru&q=" + msg.text
  };
  //Для того чтобы пользователь мог писать города на русском пропишите данную строчку
  options.uri = encodeURI(options.uri);
  processing(chatId, options)
});

function processing(chatId, options) {
  //Начало запроса
  request(options)
  //Если запрос удачный
    .then(function (res) {
      //Полученные ответ парсим в удобный для нас формат и вытаскиваем из него все что нам нужно
      let weather = JSON.parse(res),
        temp = weather.main.temp - 273.15,
        feels_like = weather.main.feels_like - 273.15,
        pressure = weather.weather[0].description,
        message = "ВАШ ГОРОД - " + weather.name + 
        "\n\n Не все могут смотреть в завтрашний день!!!!!!\n\n" +
        "Температура будет " + temp.toFixed(1) +
        "\nНО Ощущается как " + feels_like.toFixed(1) +
        "\nНе знаю зачем тебе оно, но на улице " + pressure;
      //отправляем собранное сообщение 
      bot.sendMessage(chatId, message);
    })
    //Если запрос провальный
    .catch(function (err) {
      console.log(err)
      bot.sendMessage(chatId, 'Харош писать что попало')
    })
}