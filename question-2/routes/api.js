import express from 'express';
import { getUsers, getPosts, getPostsByUser, getCommentsByPost } from '../services/fetch.js';

const router = express.Router();

router.get('/users', async (req, res) => {
    try {
        console.log("Fetching top users with most commented posts");

        const users = await getUsers();

        const userCommentCounts = [];

        for (const user of users) {
            const posts = await getPostsByUser(user.id);
            let totalComments = 0;

            for (const post of posts) {
                const comments = await getCommentsByPost(post.id);
                totalComments += comments.length;
            }

            userCommentCounts.push({
                user,
                totalComments
            });
        }

        const topUsers = userCommentCounts
            .sort((a, b) => b.totalComments - a.totalComments)
            .slice(0, 5)
            .map(item => item.user);

        res.json(topUsers);
    } catch (error) {
        console.error('Error fetching top users with most commented posts:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/posts', async (req, res) => {
    const { type } = req.query;

    if (type !== 'popular') {
        return res.status(400).json({ error: 'Invalid type parameter. Use "popular".' });
    }

    try {
        console.log('Fetching top posts with most comments...');

        const posts = await getPosts();

        const postCommentCounts = [];

        for (const post of posts) {
            const comments = await getCommentsByPost(post.id);
            postCommentCounts.push({
                post,
                totalComments: comments.length
            });
        }

        const topPosts = postCommentCounts
            .sort((a, b) => b.totalComments - a.totalComments)
            .slice(0, 5)
            .map(item => item.post);

        res.json(topPosts);
    } catch (error) {
        console.error('Error fetching top posts with most comments:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;