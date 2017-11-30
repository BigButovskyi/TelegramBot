const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '470896128:AAFhi2aeZPi0JThGc6y-JifgyE4fgnXeHT4';

let bot = new TelegramBot(token, {polling: true});
let commands = {
    schedule: 'Расписание',
    subj: 'Предметы',
    back: 'Вернуться назад'
};

bot.onText(/\/start/, function (msg, match) {
    let userID = msg.chat.id;
    // JSON object that contains custom reply markup
    startFunction(userID);

});

bot.on('message', function (msg) {
    let userID = msg.chat.id;
    switch (msg.text) {
        case commands.schedule:
            showSchedule(userID);
            break;
        case commands.subj:
            bot.sendMessage(msg.chat.id, 'Subjects');
            break;
        case commands.back:
    }
});

// ====____Functions____====
function showSchedule(userID) {
    let document = fs.readFileSync(`${__dirname}/files/b.pdf`);
    bot.sendMessage(userID, 'Loading...').then(() => {
        bot.sendMessage(userID, 'Here you go!').then(() => {
            ;bot.sendDocument(userID, document)
        })
    });
}

function startFunction(userID) {
    const opt = {
        parse_mode: 'markdown',
        disable_web_page_preview: false,
        reply_markup: JSON.stringify({
            keyboard: [
                [`Расписание`,
                    `Предметы`]],
            resize_keyboard: true
        })

    };
    bot.sendMessage(userID, 'Which one will U choose?', opt);
}