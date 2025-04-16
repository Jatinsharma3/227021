import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const id_url = {
  p: 'http://20.244.56.144/evaluation-service/primes',
  f: 'http://20.244.56.144/evaluation-service/fibo',
  e: 'http://20.244.56.144/evaluation-service/even',
  r: 'http://20.244.56.144/evaluation-service/rand',
};

const ACCESS_TOKEN = process.env.TOKEN;

export default async function fetchNums(id) {
  const url = id_url[id];
  if (!url) {
    throw new Error('Invalid ID');
  }
  try {
    const response = await axios.get(url, {
      timeout: 500,
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ID ${id}:`, error.message);
    throw new Error('Failed to fetch numbers');
  }
}