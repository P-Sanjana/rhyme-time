export const BASE_URL = 'https://rhyme-time-backend.onrender.com';
export const getRandomWord = async (difficulty: string) => {
  try {
    const res = await fetch(`${BASE_URL}/randomword?difficulty=${difficulty}`);
    const data = await res.json();
    return data.word;
  } catch (error) {
    console.error('Error fetching random word', error);
  }
};
