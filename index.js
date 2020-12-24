process.env.NTBA_FIX_319 = 1;
const request = require('request-promise');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
var config = require("config").config;
const token = process.env.BT_TOKEN;
const appId = process.env.BT_APPID;
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const options = {
    method:"GET",
    uri:"http://api.openweathermap.org/data/2.5/weather?id=524901&appid="+ appId + "&lang=ru&q=" + msg.text
};
  options.uri = encodeURI(options.uri);
  
  request(options)
  .then(function(res){
    let weather = JSON.parse(res),
    temp = weather.main.temp - 250,
    feels_like = weather.main.feels_like,
    pressure = weather.main.pressure,
    message = "ВАШ ГОРОД - "+ weather.name + "\n\nВНИМАНИЕ ТЕМПЕРАТУРА ОТОБРАЖАЕТСЯ В КЕЛЬВИНАХ А ДАВЛЕНИЕ ХУЙ ПОЙМИ В ЧЕМ ВРОДЕ В ММ РТ СТ!!!!!!\n\n"+"Температура будет " + temp + "\n НО Ощущается как "+ feels_like + "\nНе знаю зачем тебе оно, старик,но давление будет "+ pressure;
    bot.sendMessage(chatId,message);
  })  
  .catch(function (err) {
    console.log(err)
    bot.sendMessage(chatId,'Харош писать что попало')
})
});
