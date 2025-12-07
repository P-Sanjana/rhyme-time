'use server';

import { BASE_URL } from './services';

export const getRhymes = async (word: string) => {
  try {
    const res = await fetch(`${BASE_URL}/rhymes?word=${word}`);
    const data = await res.json();
    return data.rhymes_frequencies;
  } catch (error) {
    console.error('Error fetching rhymes', error);
  }
};
