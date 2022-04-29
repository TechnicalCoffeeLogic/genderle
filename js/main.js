document.addEventListener("DOMContentLoaded",()=>{

    createSquares();
    
    let guessedWords = [[]];
    let availableSpace = 1;
    let word = 'dairy';

    const keys = document.querySelectorAll(".keyboard-row button");
    
    function handleSubmitWord() {
      const currentWordArr = getCurrentWordArr();
      if (currentWordArr.length !== 5){
        window.alert("Word must be 5 letters");
      }

      const currentWord = currentWordArr.join('');
      if (currentWord === word){
        window.alert("Congrats!");
      }

      if (guessedWords.length === 6) {
        window.alert(`Moron, the word is ${word}`);
      }

      guessedWords.push([]);
    }

    function getCurrentWordArr() {
      const numberOfGuessedWords = guessedWords.length;
      return guessedWords[numberOfGuessedWords -  1];
    }

    function updateGuessedWords(letter) {
      const currentWordArr = getCurrentWordArr();

      if (currentWordArr && currentWordArr.length < 5){
        currentWordArr.push(letter);

        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpace = availableSpace + 1;

        availableSpaceEl.textContent = letter;
      }
    }

    // create the squares for the game
    function createSquares() {
      const gameBoard = document.getElementById("board");
      
      for (let index = 0; index < 30; index++){
          let square =  document.createElement("div");
          square.classList.add("square");
          square.setAttribute("id", index + 1);
          gameBoard.appendChild(square);
      } 
    }

    for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = ({target}) => {
        const letter = target.getAttribute("data-key");
        
        if (letter === 'enter'){
          handleSubmitWord();
          return
        }

        updateGuessedWords(letter);
        console.log(letter);
      };
    }
  }
)