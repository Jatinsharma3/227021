import { fetchNumbers } from "../services/fetchNumbers.js";

const WINDOW_SIZE = 10;
let numberStore = [];

export const getWindowState = async (url) => {
  const prev = [...numberStore];
  const newNumbers = await fetchNumbers(url);

  if (!Array.isArray(newNumbers)) {
    return { prev, curr: [...numberStore], avg: 0, added: [] };
  }

  const added = newNumbers.filter((num) => {
    if (!numberStore.includes(num)) {
      numberStore.push(num);
      return true;
    }
    return false;
  });

  while (numberStore.length > WINDOW_SIZE) {
    numberStore.shift();
  }

  const avg =
    numberStore.reduce((sum, val) => sum + val, 0) / numberStore.length || 0;

  return {
    prev,
    curr: [...numberStore],
    avg,
    added,
  };
};