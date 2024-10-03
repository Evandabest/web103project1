import express from 'express';
import cors from 'cors';
import { getAllPokemon } from './db';

//import { characters } from './db';
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

app.get('/characters', async (req, res) => {
  try {
      const pokemon = await getAllPokemon();
      res.json(pokemon);
  } catch (error) {
      console.error('Error fetching Pokémon:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/characters/:character', async (req, res) => {
  try {
      const pokemon = await getAllPokemon();

      const character = pokemon.find((character) => character.name === req.params.character);
      res.json(character);

  } catch (error) {
      console.error('Error fetching Pokémon:', error);
      res.status(500).send('Internal Server Error');
  }
});

//app.get('/characters', (req, res) => {
//  res.json(characters);
//});
//
//app.get('/characters/:character', (req, res) => {
//  const character = characters.find((character) => character.name === req.params.character);
//  res.json(character);
//})
//
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});