import express from 'express';

const router = express.Router();

// Handler to create a workout plan
router.post('/', (req, res) => {
    // Logic to create a workout plan
    res.status(201).send('Workout plan created');
});

// Handler to retrieve workout plans
router.get('/', (req, res) => {
    // Logic to retrieve workout plans
    res.status(200).send('List of workout plans');
});

export default router;