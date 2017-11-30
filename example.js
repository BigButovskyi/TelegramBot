var eventEmitter = new events.EventEmitter();


eventEmitter.on('my_fancy_event_1', function(){
    console.log("Sending message");
});

const TelegramBot = require('node-telegram-bot-api');

const token = '470896128:AAFhi2aeZPi0JThGc6y-JifgyE4fgnXeHT4';

let bot = new TelegramBot(token, {polling: true});

bot.onText(config.commands.commandStart, function onMessage(msg) {
    var options = {
        reply_markup: {
            inline_keyboard: [
                [{text: config.inlineText.addPurchase, callback_data: 'my_fancy_event_1'}],
                [{text: config.inlineText.addRevenue, callback_data: 'my_fancy_event_2'}],
                [{text: config.inlineText.getReport, callback_data: 'my_fancy_event_3'}]
            ]
        }
    };
    bot.sendMessage(msg.from.id, "Choose an operation.",options);
});

bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    eventEmitter.emit(callbackQuery.data);
    bot.answerCallbackQuery(callbackQuery.id, "Hi", false);
});