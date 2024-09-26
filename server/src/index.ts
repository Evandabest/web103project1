import express from 'express';
import cors from 'cors';

import { characters } from './db';
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

app.get('/characters', (req, res) => {
  res.json(characters);
});

app.get('/characters/:character', (req, res) => {
  const character = characters.find((character) => character.name === req.params.character);
  res.json(character);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});