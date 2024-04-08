import words from './fr-words.js'
import fs from 'fs';

const json = JSON.stringify(words);
fs.writeFileSync('fr-words.json', json)

