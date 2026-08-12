import express, { Request, Response } from 'express';

const router = express.Router();

// Mock data for activities
let activities = [];

// Create a new activity
router.post('/', (req: Request, res: Response) => {
    const { name, description } = req.body;
    const newActivity = { id: activities.length + 1, name, description };
    activities.push(newActivity);
    res.status(201).json(newActivity);
});

// Get all activities
router.get('/', (req: Request, res: Response) => {
    res.json(activities);
});

// Get a specific activity by ID
router.get('/:id', (req: Request, res: Response) => {
    const activity = activities.find(a => a.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('Activity not found');
    res.json(activity);
});

// Update an activity by ID
router.put('/:id', (req: Request, res: Response) => {
    const activity = activities.find(a => a.id === parseInt(req.params.id));
    if (!activity) return res.status(404).send('Activity not found');

    const { name, description } = req.body;
    activity.name = name;
    activity.description = description;
    res.json(activity);
});

// Delete an activity by ID
router.delete('/:id', (req: Request, res: Response) => {
    const activityIndex = activities.findIndex(a => a.id === parseInt(req.params.id));
    if (activityIndex === -1) return res.status(404).send('Activity not found');

    activities.splice(activityIndex, 1);
    res.status(204).send();
});

export default router;