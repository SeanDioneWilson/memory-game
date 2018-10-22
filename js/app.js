/*
 * Create a list that holds all of your cards
 */
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const deck = document.querySelector('.deck');

let flippedCards = [];

function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  console.log('cards to shuffle', cardsToShuffle);
  const shuffledcards = shuffle(cardsToShuffle);
  console.log('shuffled', shuffledcards);
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

// function that toggles a css class of the cards



// the actual listener
deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)

  ) {
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (flippedCards.length === 2 ) {
      checkForMatch(clickTarget);
    }
  }
});

function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    flippedCards.length < 2 &&
    !flippedCards.includes(clickTarget)
  );
}
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


function toggleCard(card) {
  card.classList.toggle('open');
  card.classList.toggle('show');
}


function addToggleCard(clickTarget) {
    flippedCards.push(clickTarget);
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
