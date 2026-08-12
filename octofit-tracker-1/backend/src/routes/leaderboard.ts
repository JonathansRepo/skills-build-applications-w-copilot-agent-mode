import express, { Request, Response } from 'express';

const router = express.Router();

// Sample data for leaderboard
let leaderboardData = [
    { username: 'User1', score: 100 },
    { username: 'User2', score: 90 },
    { username: 'User3', score: 80 },
];

// Route to get the leaderboard
router.get('/', (req: Request, res: Response) => {
    res.json(leaderboardData);
});

// Route to add a new entry to the leaderboard
router.post('/', (req: Request, res: Response) => {
    const { username, score } = req.body;
    if (!username || score === undefined) {
        return res.status(400).json({ message: 'Username and score are required' });
    }
    leaderboardData.push({ username, score });
    res.status(201).json({ message: 'Entry added to leaderboard' });
});

// Route to clear the leaderboard
router.delete('/', (req: Request, res: Response) => {
    leaderboardData = [];
    res.json({ message: 'Leaderboard cleared' });
});

export default router;