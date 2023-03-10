const axios = require('axios');
const { handleError } = require('../utils/handleError');

const apiUrl = `https://labs.bible.org/api/`;

const findOneVerse = async (verse) => {
  try {
    const response = await axios.get(`${apiUrl}?passage=${verse}&type=json`);
    const results = response.data;
    const finalResult = results[0];

    return finalResult;
  } catch (error) {
    console.log({ error });
    return handleError(message, 'error');
  }
};

// Function to get a random verse
const getRandomVerse = async (versesList) => {
  try {
    const response = await axios.get(`${apiUrl}?passage=random&type=json`);

    const results = response.data;
    const randomVerse = results[0];

    // Check if the verse is already in the set, if yes, get a new verse
    if (!versesList.has(randomVerse.text)) {
      versesList.add(randomVerse.text);
    } else {
      getRandomVerse();
    }

    return randomVerse;
  } catch (error) {
    console.log({ error });
    return handleError(message, 'error');
  }
};

module.exports = {
  findOneVerse,
  getRandomVerse,
};
