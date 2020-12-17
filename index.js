process.env.NTBA_FIX_319 = 1;
const request = require('request-promise');
const TelegramBot = require('node-telegram-bot-api');
const token = '1405219646:AAE4kjGSn-dVnIM6Br1H3cdShrLE5EvjYWg';
const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const options = {
    method:"GET",
    uri:'http://api.openweathermap.org/data/2.5/weather?q=' + msg.text +  '&APPID=e9d5091db0a0df91f5931bb9abb550a2&lang=ru',
};
  request(options)
  .then(function(res){
    bot.sendMessage(chatId,res)
  })  
  .catch(function (err) {
    console.log(err)
    bot.sendMessage(chatId,'что-то не так')
})
});
