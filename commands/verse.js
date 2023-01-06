const { findOneVerse } = require('../services/verse');
const { buildVerseEmbed } = require('../utils/buildVerseEmbed');

module.exports = {
  name: 'verse',
  description: 'get a specific verse',
  async execute(message, verse) {
    if (!verse) {
      return message.reply('Please provide a verse');
    }

    const result = await findOneVerse(verse);
    const embed = buildVerseEmbed(result);

    return message.reply({ embeds: [embed] });
  },
};
