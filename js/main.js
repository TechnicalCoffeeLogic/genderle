document.addEventListener("DOMContentLoaded",()=>{

    // start building the screen
    createSquares();
    
    // global vars
    let guessedWords = [[]];
    let availableSpace = 1;
    let word;
    let guessedWordCount = 0;
    let currentGuessedWordsAr = 0;
    let gameOver = false;
    const keys = document.querySelectorAll(".keyboard-row button");
    
    setImage();
    
    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: gets the correct tile color based on if letter was correct only/not correct/ corract and in correct position of word
    // pass...: letter to check against, and index to check at in word
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function getTileColor(letter, index) {
      
      const isCorrectLetter = word.includes(letter);
      if (!isCorrectLetter) {
        return "rgb(58, 58, 60)"
      }

      const letterInThatPosition = word.charAt(index);
      const isCorrectPosition = letter === letterInThatPosition;

      if (isCorrectPosition) {
        return "rgb(83, 141, 78)";
      }

      return "rgb(181, 159, 59)";
    }
    
    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: handles the delete key for the on screen game keyboard
    // pass...: nothing
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function handleDeleteLetter(){

      if (guessedWords[currentGuessedWordsAr].length === 0 || gameOver){
        return;
      }
      
      const currentWordArr = getCurrentWordArr();
      currentWordArr.pop();

      guessedWords[guessedWords.length - 1] = currentWordArr;

      const lastLetterEl = document.getElementById(String(availableSpace - 1));
      lastLetterEl.textContent = "";
      availableSpace = availableSpace - 1;
    }

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: handles users button clicks for the on screen game keyboard 
    // pass...: nothing
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function handleSubmitWord() {

      if (gameOver){
        return;
      }

      const currentWordArr = getCurrentWordArr();

      // fill in empty indexes with blanks
      for (let i = currentWordArr.length; currentWordArr.length < 5; i++){
        currentWordArr[i] = " ";
        availableSpace = availableSpace + 1;
      }

      // if (currentWordArr.length !== 5){
      //   window.alert("Word must be 5 letters");
      //   return;
      // }

      const currentWord = currentWordArr.join("");
      const firstLetterId = guessedWordCount * 5 + 1;
      const interval = 200;

      currentWordArr.forEach((letter, index) => {
        setTimeout(() => {

          const tileColor = getTileColor(letter, index);         
          const letterId = firstLetterId + index;
          const letterEl = document.getElementById(letterId);

          letterEl.classList.add("animate__flipInX");
          letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;

        }, interval * index);
      });

      guessedWordCount += 1;

      if (currentWord === word){
        window.alert("Congrats!");
        gameOver = true;
        return;
      }

      if (guessedWords.length === 6) {
        window.alert(`Moron, the word is ${word}`);
        gameOver = true;
        return;
      }

      guessedWords.push([]);
      currentGuessedWordsAr += 1;
    }

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: gets the current word array being modified
    // pass...: nothing
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function getCurrentWordArr() {
      const numberOfGuessedWords = guessedWords.length;
      return guessedWords[numberOfGuessedWords -  1];
    }

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: updates guessed word array with users letter
    // pass...: current letter to update array with
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function updateGuessedWords(letter) {

      if (gameOver)
      {
        return;
      }

      const currentWordArr = getCurrentWordArr();

      if (currentWordArr && currentWordArr.length < 5){
        currentWordArr.push(letter);

        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpace = availableSpace + 1;

        availableSpaceEl.textContent = letter;
      }
    }

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: setup image and word
    // pass...: nothing
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function setImage() {
      const imgContainer = document.getElementById("image-container");
      const imageObject = [
        {
          src: "images/man.png",
          word: "man  "
        }
      ]
      let image = document.createElement("img");
      image.src = imageObject[0].src;
      word = imageObject[0].word;
      imgContainer.appendChild(image);
    }

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: create the squares for the game
    // pass...: nothing
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function createSquares() {
      const gameBoard = document.getElementById("board");
      
      for (let index = 0; index < 30; index++){
          let square =  document.createElement("div");
          square.classList.add("square");
          square.classList.add("animate__animated");
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

        if (letter === 'del'){
          handleDeleteLetter();
          return;
        }

        updateGuessedWords(letter);
        console.log(letter);
      };
    }
  }
)