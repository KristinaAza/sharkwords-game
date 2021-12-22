const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;
let numCorrect = 0;

// Loop over the chars in `word` and create divs.
//

const createDivsForChars = word => {
  const wordContainer = document.querySelector('#word-container');
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  const letterButtonContainer = document.querySelector('#letter-buttons');
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = buttonEl => {
  buttonEl.disabled = true;
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = letter => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, word) => {
  
  const letterDivs = document.querySelectorAll(`div.${letter}`);
  for (const div of letterDivs){
    div.innerHTML = `${letter}`
    numCorrect += 1;
  }
  
  if (numCorrect === word.length) {
    const unhide = document.querySelector("#win")
    unhide.style.display = ""
    
    const letterButtons = document.querySelectorAll("#letter-buttons")[0]["childNodes"]
  
    for (const letterButton of letterButtons) { 
      disableLetterButton(letterButton);
   }
  }
};

//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  if (numWrong === 5) {
    const unhide = document.querySelector("#play-again")
    unhide.style.display = ""

    const letterButtons = document.querySelectorAll("#letter-buttons")[0]["childNodes"]
    console.log(letterButtons);

    for (const letterButton of letterButtons) { 
      console.log(letterButton);
      disableLetterButton(letterButton);
      console.log(letterButton);
    }
  } else {
      image = document.querySelector('img')
      image.setAttribute('src', `/static/images/guess${numWrong}.png`)
  }
};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];

  createDivsForChars(word);
  generateLetterButtons();

  // add an event handler to handle clicking on a letter
  const letterButtons = document.querySelectorAll('#letter-buttons')
  for (const letterButton of letterButtons) {
      
      letterButton.addEventListener('click', (evt) => {
      const button = evt.target;
      const letter = button.innerHTML;
      
      if (isLetterInWord(letter)) {
        handleCorrectGuess(letter, word);
      } else {
        handleWrongGuess(letter);
      }
      disableLetterButton(button);   
  });
}
  



  // add an event handler to handle clicking on the Play Again button
  play_again = document.querySelector('#play-again')
  play_again.addEventListener('click', resetGame)

  win_play_again = document.querySelector('#win')
  win_play_again.addEventListener('click', resetGame)
})();
