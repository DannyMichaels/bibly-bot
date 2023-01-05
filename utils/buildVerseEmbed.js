const { EmbedBuilder } = require('@discordjs/builders');
const { generateRandomRGB } = require('./color');

const buildVerseEmbed = (verse) => {
  const randomColor = generateRandomRGB();

  const title = `${verse.bookname} ${verse.chapter}:${verse.verse}`;
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(verse.text)
    .setColor(randomColor); // acceptts [r,g,b] or 0x013139
  return embed;
};

module.exports = {
  buildVerseEmbed,
};
