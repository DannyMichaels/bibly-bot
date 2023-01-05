const { buildVerseEmbed } = require('../utils/buildVerseEmbed');
const { handleError } = require('../utils/handleError');

module.exports = {
  name: 'randomverse',
  description: 'gets a random verse',
  async execute(message, versesList) {
    try {
      const { getRandomVerse } = require('../services/verse');

      const verse = await getRandomVerse(versesList);
      const embed = buildVerseEmbed(verse);

      return message.reply({ embeds: [embed] });
    } catch (error) {
      console.log({ error });
      return handleError(message, error.toString());
    }
  },
};
