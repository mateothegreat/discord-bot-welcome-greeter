/**
 *
 * Runs a javascript code execution bot.
 *
 * Get your token from https://discordapp.com/developers/applications/me/
 *
 */
require('dotenv').config();

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

//
// Cleans things up
//
const clean = text => {

    if (typeof (text) === 'string') {

        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));

    }

    return text;

};

const greetings = [
    'Hey there :name:! Welcome .. what are you working on these days?',
    'Great to see ya here :name:!! We\'re a community of developers, sysadmins and tech enthusiasts :) Tell us a little about yourself!'
];

// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {

    console.log(`${new Date().toString()} bot started!`);

});

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {

    //
    // Prevent replying to self
    //
    if (message.author.bot) return;

    //
    // Check if the message starts with the `>` trigger
    //
    if (message.content.indexOf('>') === 0) {

        //
        // Get the user's message excluding the `>`
        //
        const text = message.content.substring(1);

        if (text === 'ping') {

            message.reply('pong!');

        } else if (text === 'greet.test') {

            message.reply(greetings[ Math.floor(Math.random() * greetings.length) ]);

        }

    } else if (message.content.indexOf('!') === 0) {

        if (message.content === '!version') {

            message.reply('Version: ' + process.env.VERSION);

        } else {

            message.reply('unknown command');

        }

    }

});

bot.on('guildMemberAdd', member => {

    console.log(member);

    setTimeout(() => {

        member.guild.channels.get('548784663909629952').send(greetings[ Math.floor(Math.random() * greetings.length) ].replace(':name:', member));

    }, 15000);

});

//
// Login.. (start things up)
//
bot.login(process.env.TOKEN);

