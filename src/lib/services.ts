const BASE_URL = 'https://rhyme-time-backend.onrender.com';
export const getRandomWord = async (difficulty: string) => {
  try {
    const res = await fetch(`${BASE_URL}/randomword?difficulty=${difficulty}`);
    const data = await res.json();
    return data.word;
  } catch (error) {
    console.error('Error fetching random word', error);
  }
};

export const getRhymes = async (word: string) => {
  try {
    const res = await fetch(`${BASE_URL}/rhymes?word=${word}`);
    const data = await res.json();
    return data.rhymes;
  } catch (error) {
    console.error('Error fetching rhymes', error);
  }
};
