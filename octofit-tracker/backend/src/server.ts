import express from 'express';
import './config/database.js';
import { getApiBaseUrl } from './config/environment.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

const users = [
  { id: 1, name: 'Ada Lovelace', email: 'ada@example.com' },
  { id: 2, name: 'Grace Hopper', email: 'grace@example.com' }
];

const activities = [
  { id: 1, name: 'Morning Run', description: '5km jog' },
  { id: 2, name: 'Strength Training', description: 'Upper body workout' }
];

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl: getApiBaseUrl() });
});

app.get('/api/users', (_request, response) => {
  response.json(users);
});

app.get('/api/activities', (_request, response) => {
  response.json(activities);
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});