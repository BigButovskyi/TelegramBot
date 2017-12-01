const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

const token = '470896128:AAFhi2aeZPi0JThGc6y-JifgyE4fgnXeHT4';

let bot = new TelegramBot(token, {polling: true});
let commands = {
    schedule: 'Расписание',
    subj: 'Предметы',
    session: 'Даты сессии',
    courseWork: 'Курсовая'
};


let subjects = {
    modo: "МОДО",
    terVer: "Теория Вероятности",
    back: 'Назад 💫'
};

let modo = {
    theory: 'Лекции',
    colocvium: 'Кол-виумы',
    temPlan: 'Тем План',
    back: 'Назад 👻'
};

let terVer = {
    mainBook: "Посібник ТЙМС",
    tsrExercise: "ТСР завдання",
    back: "Назад"
};

let lectionsList = [
    {
        'text': 'Lection 1',
        'url': 'https://drive.google.com/open?id=1SFvd5gMF4J8IrPnLR40hqnVJPu_avIHL'
    },
    {
        'text': 'Lection 2 and 3',
        'url': 'https://drive.google.com/open?id=1Uq9BGDEAoCvct0sZZ4U2qT_Zw1sJbWaJ'
    }, {
        'text': 'Lection 4',
        'url': 'https://drive.google.com/open?id=1fMmFindpNh9Bz81i5cWiWrJaGF9yVxQB'
    }, {
        'text': 'Lection 5',
        'url': 'https://drive.google.com/open?id=1BV9Mxe8yuPmq1N6g19iNiOPyoZxXT7vk'
    }, {
        'text': 'Lection 6 and 7',
        'url': 'https://drive.google.com/open?id=1ewSZOoLmtGGYTztqeYjopzaxVqEhbvFz'
    }, {
        'text': 'Lection 8',
        'url': 'https://drive.google.com/open?id=1PXaKkWeMDQZZDnI5hUp5s59rf88Cdl8U'
    }, {
        'text': 'Lection 9',
        'url': 'https://drive.google.com/open?id=1Uda1xf2WxuU_gBfiHYrOncl7fwfk12OO'
    }, {
        'text': 'Lection 10',
        'url': 'https://drive.google.com/open?id=1C2_VUtlc5LBzrOEYnXee4_SfRzN-k2-2'
    }, {
        'text': 'Lection 11',
        'url': 'https://drive.google.com/open?id=10cdmMCtPFTx9PxaGJi6bnNCtH0UNe3F0'
    }, {
        'text': 'Lection 12',
        'url': 'https://drive.google.com/open?id=127PaDCpT0W9iaQgC7OHVTN5qm6KRWPua'
    }
];

bot.onText(/\/start/, function (msg, match) {
    let userID = msg.from.id;
    bot.sendMessage(userID, '😱😱😱😱 !WOW WOW WOW! 😱😱😱😱');
    setTimeout(() => {
        bot.sendMessage(userID, 'Who do I see 😀')
    }, 1000);
    let greetings1 = 'Hello, my dear Friend! I am InfoPmbot, one on the sweatest telegram bots.\n' +
        'My own mission is to help NaUKMA applied mathemetics` students who are on the 3 course of studing now. ' +
        'I can give you any data which I have. \n';
    greetings2 = 'At the moment, I could broadcast some of these topics:\n' +
        '1) Schedule\n' +
        '2) Subject information - included theory material, practical, oral exams and teacher contacts \n' +
        '3) Course Work \n' +
        '4) Final exams dates' +
        '\n 🐨 Okay! So! Lets begin 🐼\n' +
        'Use /info command for calling me';

    setTimeout(() => {
        bot.sendMessage(userID, greetings1);
        setTimeout(() => {
            bot.sendMessage(userID, greetings2)
        }, 3000);
    }, 2000);
});

bot.onText(/\/info/, function (msg, match) {
    let userID = msg.from.id;
    // JSON object that contains custom reply markup
    startFunction(userID, true, msg);

});

bot.onText(/\/help/, function (msg, match) {
    let userID = msg.from.id;
    let response = 'Hey! What`s up??? U need my help? Here I am 😏' + "\n" + "Use this list commands:\n"
        + "/info - start conversation(main command, use it always in order to begin dialog with me); \n" + "/start - see Greetings;\n" + "/help = show list of all commands"
    bot.sendMessage(userID, greetings);
});
bot.on('message', function (msg) {
    let userID = msg.from.id;
    switch (msg.text) {
        case commands.schedule:
            showSchedule(userID);
            break;
        case commands.subj:
            showSubjects(userID);
            break;
        case commands.session:
            sendSessionPhotos(userID);
            break;
        case commands.courseWork:
            bot.sendMessage(userID, 'https://goo.gl/y6RaU3');
            break;
        case subjects.modo:
            showModoData(userID);
            break;
        case subjects.terVer:
            showTerVerData(userID);
            break;
        case subjects.back:
            startFunction(userID);
            break;
        case modo.theory:
            lections(userID);
            break;
        case modo.colocvium:
            coloc(userID);
            break;
        case modo.temPlan:
            bot.sendMessage(userID, 'Here https://goo.gl/WMro7r');
            break;
        case modo.back:
            showSubjects(userID);
            break;
        case terVer.mainBook:
            bot.sendMessage(userID, 'Here https://goo.gl/qU8vCM');
            break;
        case terVer.tsrExercise:
            bot.sendMessage(userID, 'Here https://goo.gl/P1JL1o');
            break;
        case terVer.back:
            showSubjects(userID);
            break;
    }
});

// ====____Functions____====
function showSchedule(userID) {
    bot.sendMessage(userID, 'Loading...').then(() => {
        bot.sendMessage(userID, 'https://goo.gl/99r2vz');

    });
}

function startFunction(userID, start = false, msg) {
    let response = (start === true) ?
        'Hello, ' + msg.from.first_name + "! How could I help U? 🙂" :
        'How could I help U?';
    const opt = {
        parse_mode: 'markdown',
        disable_web_page_preview: false,
        reply_markup: JSON.stringify({
            keyboard: [
                [commands.schedule,
                    commands.subj],
                [commands.session, commands.courseWork]],
            resize_keyboard: true,
            selective: false,
            one_time_keyboard: false
        })

    };
    bot.sendMessage(userID, response, opt);
}

function showSubjects(userID) {
    let keyboard = {
        reply_markup:
            JSON.stringify({
                keyboard: [
                    [subjects.modo, subjects.terVer]
                    , [subjects.back]],
                resize_keyboard: true
            })
    };
    bot.sendMessage(userID, 'Choose Subject 😁', keyboard);
}

// functions for МОДО subject

function showModoData(userID) {
    let keyboard = {
        reply_markup:
            JSON.stringify({
                keyboard: [
                    [modo.theory, modo.colocvium, modo.temPlan],
                    [modo.back]],
                resize_keyboard: true
            })
    };
    bot.sendMessage(userID, 'What exactly? 🤖', keyboard);
}

function lections(userID) {
    let sortedLections = (() => {
        let returningArray = [],
            temporaryArray = [];

        let count = 0;
        lectionsList.forEach(item => {
            temporaryArray.push({'text': item.text, 'url': item.url});
            count++;
            if (count === 3) {
                returningArray.push(temporaryArray);
                count = 0;
                temporaryArray = [];
            }
        });
        if (temporaryArray.length < 3 && temporaryArray.length > 0)
            returningArray.push(temporaryArray);
        return returningArray;
    })();

    console.log(sortedLections);
    let keyboard = {
        reply_markup:
            JSON.stringify({
                inline_keyboard:
                sortedLections
                ,
                resize_keyboard: true
            })
    };
    bot.sendMessage(userID, 'Here ✨', keyboard);
}


function coloc(userID) {
    let keyboard = {
        reply_markup:
            JSON.stringify({
                inline_keyboard:
                    [
                        [
                            {
                                'text': 'Колоквиум №1',
                                'url': 'https://drive.google.com/open?id=1Gw5UR033Z5522o3AX-UkwPcWA-M8Nwm0'
                            },
                            {
                                'text': 'Колоквиум №2',
                                'url': 'https://drive.google.com/open?id=161aYoN1JqE0bL_JGVFkU5xLdoVWpDfeS'
                            }
                        ]
                    ],
                resize_keyboard: true
            })
    };
    bot.sendMessage(userID, 'Here ✨', keyboard);
}

function showTerVerData(userID) {
    let keyboard = {
        reply_markup: JSON.stringify(
            {
                keyboard: [
                    [terVer.mainBook, terVer.tsrExercise], [terVer.back]
                ],
                resize_keyboard: true
            }
        )
    };
    bot.sendMessage(userID, 'Yeap!', keyboard);
}

function sendSessionPhotos(userID) {
    bot.sendMessage(userID, 'Loading...');
    bot.sendMessage(userID, 'https://goo.gl/SE3ZuE').then(() => {
        bot.sendMessage(userID, 'https://goo.gl/T7VAM1');
    });
}