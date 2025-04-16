import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0Nzg3NDQwLCJpYXQiOjE3NDQ3ODcxNDAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQ4OTQzYmE3LWZmNGQtNDhiNS1hYjExLWUyOWU4ZjUyYzJiNyIsInN1YiI6InNhdXJhYmhqZXNpbmdoQGdtYWlsLmNvbSJ9LCJlbWFpbCI6InNhdXJhYmhqZXNpbmdoQGdtYWlsLmNvbSIsIm5hbWUiOiJzYXVyYWJoIHNpbmdoIiwicm9sbE5vIjoiMjI3MDQ4IiwiYWNjZXNzQ29kZSI6Ikh0UWR6USIsImNsaWVudElEIjoiZDg5NDNiYTctZmY0ZC00OGI1LWFiMTEtZTI5ZThmNTJjMmI3IiwiY2xpZW50U2VjcmV0IjoiYlJ6aHZyR2h0VVlOR1pkVyJ9.igV55bNo4EFE7IPqGfUfOtzcTvYwwOu6Tkbjwe5n4ho';

const headers = {
    Authorization: `Bearer ${BEARER_TOKEN}`
};

export async function getUsers() {
    console.log('Fetching users...');
    const res = await axios.get(`${BASE_URL}/users`, { headers });
    return res.data;
}

export async function getPostsByUser(userId) {
    console.log(`Fetching posts for user ${userId}...`);
    const res = await axios.get(`${BASE_URL}/users/${userId}/posts`, { headers });
    return res.data;
}

export async function getPosts() {
    const res = await axios.get(`${BASE_URL}/posts`, { headers });
    return res.data;
}

export async function getCommentsByPost(postId) {
    console.log(`Fetching comments for post ${postId}...`);
    const res = await axios.get(`${BASE_URL}/posts/${postId}/comments`, { headers });
    return res.data;
}