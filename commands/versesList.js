module.exports = {
  name: 'verseslist',
  description: 'lists all the called verses',
  execute(message, versesList) {
    return message.channel.send(JSON.stringify([...versesList]));
  },
};
