var cards = document.querySelectorAll('.card');
var flipStatus = false;
var twoCards = false;
var firstCard;
var secondCard;
var turns = 0;
// var countRemoveState = 0;

// Timer
var timer = 0;


function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
    document.getElementById("seconds").innerHTML=pad(++timer%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(timer/60,10));
}, 1000);
  

// Manage card states for flipped cards, add to turn counter
function flipCard() {
	if (twoCards) return;
	if (this === firstCard) return;
	this.classList.add('flip');

	if (!flipStatus) {
		flipStatus = true;
		firstCard = this;
		return;
	};
	secondCard = this;
	turns++;
	// console.log(turns);
	document.getElementById("turns").innerHTML = turns;

	checkMatch();
};

// Check for match
function checkMatch() {
	if (firstCard.dataset.scene === secondCard.dataset.scene) {
		removeCardState();
		return;
	};

	flipBack();
};

// Remove card state
function removeCardState() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	reset();
	// countRemoveState++;
	// console.log("Number of matches: " + countRemoveState);
	// if (countRemoveState === 8) {
	// 	// console.log("this is where timer should stop");
	// };

// function clearTimer() {
// 	clearInterval(timer);
// 	// console.log("clearTimer was run");
};


// Turn card back
function flipBack() {
	twoCards = true;
	setTimeout(function () {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		reset();
	}, 1500);

};

function reset() {
	[flipStatus, twoCards] = [false, false];
	[firstCard, secondCard]  = [null, null];
};

(function shuffle() {
  cards.forEach(function (card) {
    var random = Math.floor(Math.random() * 12);
    card.style.order = random;
  });
})();

// Event listener for card flip
cards.forEach(function (card) {
	return card.addEventListener('click', flipCard);
});