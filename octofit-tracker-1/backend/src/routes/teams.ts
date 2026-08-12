import express, { Request, Response } from 'express';

const router = express.Router();

// Mock data for demonstration purposes
let teams = [];

// Create a new team
router.post('/', (req: Request, res: Response) => {
    const newTeam = req.body;
    teams.push(newTeam);
    res.status(201).json(newTeam);
});

// Get all teams
router.get('/', (req: Request, res: Response) => {
    res.status(200).json(teams);
});

// Get a team by ID
router.get('/:id', (req: Request, res: Response) => {
    const teamId = req.params.id;
    const team = teams.find(t => t.id === teamId);
    if (team) {
        res.status(200).json(team);
    } else {
        res.status(404).json({ message: 'Team not found' });
    }
});

// Update a team by ID
router.put('/:id', (req: Request, res: Response) => {
    const teamId = req.params.id;
    const index = teams.findIndex(t => t.id === teamId);
    if (index !== -1) {
        teams[index] = { ...teams[index], ...req.body };
        res.status(200).json(teams[index]);
    } else {
        res.status(404).json({ message: 'Team not found' });
    }
});

// Delete a team by ID
router.delete('/:id', (req: Request, res: Response) => {
    const teamId = req.params.id;
    teams = teams.filter(t => t.id !== teamId);
    res.status(204).send();
});

export default router;