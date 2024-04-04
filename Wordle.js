export default class Wordle {
  vocabulary;
  wordLength;
  word;
  maxGuesses;
  guesses;
  guessEvaluations;
  wrongLetters;
  possibleLetters;
  correctLetters;

  constructor(maxGuesses, wordLength, vocabulary) {
    this.vocabulary = vocabulary;
    this.wordLength = wordLength;
    this.maxGuesses = maxGuesses;

    this.init();
  }

  get state() {
    return {
      guesses: this.guesses,
      guessEvaluations: this.guessEvaluations,
      wrongLetters: this.wrongLetters,
      possibleLetters: this.possibleLetters,
      correctLetters: this.correctLetters,
      guessIndex: this.guessIndex,
      gameOver: this.gameOver,
      gameWon: this.gameWon,
      gameLost: this.gameLost,
    }
  }

  get guessIndex() {
     const i = this.guesses.findIndex(row => row[0] === null)

    if (i === -1) return this.guesses.length
    else return i;
  }

  get guess() {
    return this.guesses[this.guessIndex - 1];
  }

  get gameOver() {
    return this.gameWon || this.gameLost;
  }

  get gameWon() {
    return this.guess === this.word;
  }

  get gameLost() {
    return (
      this.guessIndex === this.maxGuesses &&
      !this.gameWon
    );
  }

  init() {
    this.word = this.generateWord();
    this.guesses = this.generateBoard();
    this.guessEvaluations = this.generateBoard();
    this.wrongLetters = new Set();
    this.possibleLetters = new Set();
    this.correctLetters = new Set();

    return this;
  }

  clone() {
    const clone = new Wordle(
      this.maxGuesses,
      this.wordLength,
      this.vocabulary,
    )

    for (const property in this) {
       clone[property] = this[property];
    }

    return clone;
  }

  submitGuess(guess) {
    if (this.gameOver || !this.isValidGuess(guess))
      return this;

    this.guesses[this.guessIndex] = guess.split("");

    this.checkLetters();

    return this;
  }

  isValidGuess(guess) {
    return (
      this.vocabulary.includes(guess) &&
      guess.length === this.wordLength
    );
  }

  generateWord() {
    const filteredVocabulary = this.vocabulary.filter(
      (word) => word.length === this.wordLength,
    );

    const randomIndex = Math.floor(
      Math.random() * filteredVocabulary.length,
    );

    return filteredVocabulary[randomIndex];
  }

  checkLetters() {
    const letters = this.guess;

    const guessEvaluation = [];

    const result = letters.forEach((letter, index) => {
      if (letter === this.word[index]) {
        this.correctLetters.add(letter);
        guessEvaluation.push(1);
      } else if (this.word.includes(letter)) {
        this.possibleLetters.add(letter);
        guessEvaluation.push(2);
      } else {
        this.wrongLetters.add(letter);
        guessEvaluation.push(0);
      }
    });

    this.guessEvaluations[this.guessIndex -1] = guessEvaluation;

    return result;
  }

  generateBoard() {
    const arr = new Array(this.maxGuesses).fill(null);
    const board = arr.map(row => {
      return new Array(this.wordLength).fill(null);
    })
    return board;
  }
}
