const ADMINROLE = process.env.ADMIN_ROLE_ID || '1020118124810477579';

module.exports = {
  name: 'clearverseslist',
  description: 'lists all the called verses',
  execute(message, versesList) {
    if (!message.member.roles.cache.has(ADMINROLE)) {
      return message.reply('Only an admin can do this!');
    }

    versesList.clear();
    return message.reply('done!');
  },
};
