import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Wordle from './../Wordle'
import vocabulary from './../words.json'

const game = new Wordle(6,6,vocabulary)
game.submitGuess("aiuole")

let newGame = Object.assign({}, game)
newGame = Object.setPrototypeOf(newGame, Wordle.prototype)

console.log(newGame.submitGuess("aiuole").guesses)

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)


