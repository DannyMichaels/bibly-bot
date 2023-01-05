const { EmbedBuilder } = require('discord.js');

const makeErrorEmbed = (error) => {
  const embed = new EmbedBuilder()
    .setColor(0xff0000)
    .setTitle('Error')
    .setDescription(error);
  return embed;
};

/**
 * @method handleError
 * @param {Object} message
 * @param {String} error
 * @return {MessageEmbed}
 */
const handleError = async (message, error) => {
  const embed = makeErrorEmbed(error);
  message.reply({ embeds: [embed] });
};

module.exports = {
  handleError,
  makeErrorEmbed,
};
