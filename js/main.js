document.addEventListener("DOMContentLoaded",()=>{   
    // global vars
    var guessedWords = [[]];
    var availableSpace = 1;
    var word;
    var guessedWordCount = 0;
    var currentGuessedWordsAr = 0;
    var gameOver = false;
    var tmpWord;

    const keys = document.querySelectorAll(".keyboard-row button");
    const wordLength = 6
    const numberOfTries = 5;

    // start building the screen
    setImage();
    createSquares();
    showHowToPlay();

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: gets the correct tile color based on if letter was correct only/not correct/ corract and in correct position of word
    // pass...: letter to check against, and index to check at in word
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function getTileColor(letter, index) {
      
      //const isCorrectLetter = word.includes(letter);
      const isCorrectLetter = tmpWord.includes(letter);

      if (!isCorrectLetter) {
        return "rgb(58, 58, 60)"
      }
            
      tmpWord = tmpWord.replace(letter,'');
      
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

      //const currentWordArr = getCurrentWordArr();
      var currentWordArr = getCurrentWordArr();
      tmpWord = word;

      // fill in empty indexes with blanks
      for (let i = currentWordArr.length; currentWordArr.length < wordLength; i++){
        currentWordArr[i] = " ";
        availableSpace = availableSpace + 1;
      }
      
      var tileIndexToCheck = currentWordArr.length - 1;
      const currentWord = currentWordArr.join("");
      const firstLetterId = guessedWordCount * wordLength + 1;      
      var interval = 2 * tileIndexToCheck;

      // reverse array to due the possibility of blank spaces in word.. i.e. male
      currentWordArr = currentWordArr.reverse();
      currentWordArr.forEach((letter, index) => {
        setTimeout(() => {
          const tileColor = getTileColor(letter, tileIndexToCheck);                   
          const letterId = firstLetterId + tileIndexToCheck;
          const letterEl = document.getElementById(letterId);

          letterEl.classList.add("animate__flipInX");
          letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
          tileIndexToCheck -= 1;                  
        }, 1);
      });

      guessedWordCount += 1;

      if (currentWord === word){
        alert('Congrats! You know what a man and a woman are.', 'success')
        gameOver = true;
        return;
      }

      if (guessedWords.length === numberOfTries) {
        alert(`The correct gender is ${word}. If you would like to understand why this is, check out the background section when you click the ? on the top right`, 'danger')      
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

      if (currentWordArr && currentWordArr.length < wordLength){
        currentWordArr.push(letter);

        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpace = availableSpace + 1;

        availableSpaceEl.textContent = letter;
      }
    }

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: Show alert message
    // pass...: message to display, type of alert
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------    
    function alert(message, type) {

      var alertPlaceholder = document.getElementById('modalBody')
      var wrapper = document.createElement('div')      
      wrapper.innerHTML = '<div class="alert alert-' + type + ' role="alert">' + message + '</div>'
      alertPlaceholder.append(wrapper)

      var modalTitle = document.getElementById('modalTitle');
      if (type === 'success'){
        modalTitle.innerText = 'Success';
      }
      else {
        modalTitle.innerText = 'Failed';
      }


      var options = {backdrop: true, keyboard: false, focus: true};
      var myModal = new bootstrap.Modal(document.getElementById('statusModal'), options);

      myModal.show();
      console.log(myModal);
    }

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: shows user the 'how to play modal' when they visit the website
    // pass...: nothing
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function showHowToPlay() {

      var options = {backdrop: true, keyboard: false, focus: true};
      var myModal = new bootstrap.Modal(document.getElementById('howToModal'), options);
      myModal.show();

    }

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: setup image and word
    // pass...: nothing
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function setImage() {
      const numberOfPics = 11;
      const imgContainer = document.getElementById("image-container");
      const imageObject = [
        {
          src: "images/man1.jpg",
          word: "male  "
        },
        {
          src: "images/man2.jpg",
          word: "male  "
        },
        {
          src: "images/woman1.jpg",
          word: "female"
        },
        {
          src: "images/man3.jpg",
          word: "male  "
        },
        {
          src: "images/woman2.jpg",
          word: "female"
        },
        {
          src: "images/woman3.jpg",
          word: "female"
        },
        {
          src: "images/man4.jpg",
          word: "male  "
        },
        {
          src: "images/man5.jpg",
          word: "male  "
        },
        {
          src: "images/man6.jpg",
          word: "male  "
        },
        {
          src: "images/man7.jpg",
          word: "male  "
        },
        {
          src: "images/woman4.jpg",
          word: "female"
        }
      ]

      let newDate = new Date();
      let picIndex = newDate.getDate() % numberOfPics;  
      let image = document.createElement("img");
      image.src = imageObject[picIndex].src;
      image.className = 'class="img-thumbnail"';
      tmpWord = word;
      word = imageObject[picIndex].word;
      imgContainer.appendChild(image);
      //imgContainer.innerHTML = imageObject[picIndex].src;
    }

    // -------------------------------------------------------------------------------------------------------------------------------
    // purpose: create the squares for the game
    // pass...: nothing
    // return.: nothing
    // -------------------------------------------------------------------------------------------------------------------------------
    function createSquares() {
      const gameBoard = document.getElementById("board");
      
      for (let index = 0; index < (wordLength * numberOfTries); index++){
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