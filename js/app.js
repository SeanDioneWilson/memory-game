
// variables
const deck = document.querySelector('.deck');
let moves = 0;
let flippedCards = [];
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
const TOTAL_PAIRS = 8;



// shuffle cards and append to deck
function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}
shuffleDeck();


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// event listener for card clicks -
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)
  ) {
    if (clockOff) {
      startClock();
      clockOff = false;
    }
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (flippedCards.length === 2 ) {
      checkForMatch(clickTarget);
      addMove();
      checkScore();
    }
  }
});

// function for checking if the card click should be approved
function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    flippedCards.length < 2 &&
    !flippedCards.includes(clickTarget)
  );
}

// function for checking if the clicked cards are a match
function checkForMatch() {
  if (flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
    flippedCards[0].classList.toggle('match');
    flippedCards[1].classList.toggle('match');
    flippedCards = [];
    matched++;
    if (matched === TOTAL_PAIRS) {
      gameOver();
    }
  }
  else {
    setTimeout(() => {
      toggleCard(flippedCards[0]);
      toggleCard(flippedCards[1]);
      flippedCards = [];
    }, 1000);
  }
}

// toggle css class list of clicked cards
function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}

// add the flipped cards to a 'hidden' array for keeping track
function addToggleCard(clickTarget) {
    flippedCards.push(clickTarget);
}

// add number of moves to the counter
function addMove() {
  moves++;
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

// function to check number of moves in order to determine star rating
function checkScore() {
  if (moves === 16 || moves ===24) {
    hideStar();
  }
}

// remove star function
function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
      if (star.style.display !== 'none') {
        star.style.display = 'none';
        break;
      }
  }
}

// clock function using setInterval
function startClock() {
  clockId = setInterval(() => {
    time++
    displayTime();
  }, 1000);
}

// display time function
function displayTime() {
  const clock = document.querySelector('.clock');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}

// stop the clock
function stopClock() {
  clearInterval(clockId);
}

// function to toggle the modal
function toggleModal() {
  const modal = document.querySelector('.modal__background');
  modal.classList.toggle('hide');
}


// function that puts the modal stats into the dom
function writeModalStats() {
  const timeStat = document.querySelector('.modal__time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal__moves');
  const starsStat = document.querySelector('.modal__stars');
  const stars = getStars();

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`;
}

// get stars function
function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount++;
    }
  }
  console.log(starCount);
  return starCount;
}

// modal modal__buttons
document.querySelector('.modal__cancel').addEventListener('click', () => {
  toggleModal();
});

document.querySelector('.modal__replay').addEventListener('click', () => {

});

// reset game function
function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  resetCards();
  shuffleDeck();
}

function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

// reset moves
function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

// reset stars function
function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

//  reset button handler
document.querySelector('.restart').addEventListener('click', resetGame);


document.querySelector('.modal__replay').addEventListener('click', replayGame);

// game over function
function gameOver() {
  stopClock();
  writeModalStats();
  toggleModal();
}

// replay game
function replayGame() {
  resetGame();
  toggleModal();
  resetCards();
}

// resetCards function
function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}
