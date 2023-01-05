require('dotenv').config();
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { buildVerseEmbed } = require('./utils/buildVerseEmbed');
const schedule = require('node-schedule');
const { getRandomVerse } = require('./services/verse');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

let textChannel;
const prefix = process.env.PREFIX || '$';
client.commands = new Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const versesList = new Set();

client.on('ready', () => {
  console.log("Beep boop, I'm online!");
  textChannel = client.channels.cache.get(process.env.BIBLY_CHANNEL_ID);

  // Script to be executed every day at 6am EST (11am UTC)
  const job = schedule.scheduleJob(
    { hour: 6, minute: 00, tz: 'America/New_York' },
    async () => {
      textChannel.send("It's time for your daily verse! 🙏");

      const verse = await getRandomVerse(versesList);
      const embed = buildVerseEmbed(verse);

      return textChannel.send({ embeds: [embed] });
    }
  );
});

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (message.channelId !== process.env.BIBLY_CHANNEL_ID) {
    return message.reply('Please do this in the Bibly channel! 🙏');
  }

  if (command === 'biblycommandslist' || command === 'biblyhelp') {
    return [...client.commands.values()].forEach((command) => {
      message.channel.send(
        `Command: ${prefix}${command.name} - ${command.description}`
      );
    });
  }

  if (command === 'randomverse') {
    return await client.commands
      .get('randomverse')
      .execute(message, versesList);
  }

  if (command === 'clearverseslist') {
    return await client.commands
      .get('clearverseslist')
      .execute(message, versesList);
  }
  if (command === 'verseslist') {
    return await client.commands.get('verseslist').execute(message, versesList);
  }
});

client.login(process.env.DISCORD_TOKEN);
