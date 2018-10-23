
// variables
const deck = document.querySelector('.deck');
let moves = 0;
let flippedCards = [];


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
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (flippedCards.length === 2 ) {
      checkForMatch(clickTarget);
      addMove();
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










/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
