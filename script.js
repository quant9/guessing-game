var playerGuess, mysteryNum, hotOrCold, highOrLow, count = 0;
var maxCount = 5;
var guesses = [];

function createMysteryNum() {
	mysteryNum = Math.floor(100 * Math.random() + 1);
}

function validate() {
	playerGuess = parseFloat(document.getElementById('guess').value);
	if (Math.round(playerGuess) === playerGuess && playerGuess >= 1 && playerGuess <= 100) {
		return true;
	} else {
		alert("You didn't enter a valid number. Try again.");
		return false;
	}
}

function repeatNumCheck(num) {

	guesses.push(num);
	for (var i = 0, len = guesses.length; i < len-1; i++) {
		if (num === guesses[i]) {
			guesses.pop();
			alert("You've already guessed that number!");
			return true;
		}
	}
	return false;
}

$(document).ready(function() {

	createMysteryNum();

	function checkIfMatch(a,b) {
		if (a === b) {
			count = -1;
			$('h3').replaceWith("<h3>YOU WIN! Click 'Play Again' to play again.</h3>");
		} else {
			highOrLow = a > b ? "LOWER" : "HIGHER";
			hotOrCold = Math.abs(a-b) < 10 ? "HOT (within 10 away)" : "COLD (more than 10 away)";
			$('h3').replaceWith("<h3>You are " + hotOrCold + ". Guess " + highOrLow + ".<br>Tries left: " + (maxCount-count) + "</h3>");
		}
	}

	$('#submit').click(function() {
		if (count !== -1 && validate() && !repeatNumCheck(playerGuess)) {
			count++;
			if (count < maxCount) {
				checkIfMatch(playerGuess,mysteryNum);
			}
			else {
				$('h3').replaceWith("<h3>Sorry, you lose. The number was "+mysteryNum+". Press 'Play Again' to play again.</h3>");
			}
		}
	});

	$('#again').click(function() {
		createMysteryNum();
		count = 0;
		guesses = [];
		$('h3').replaceWith("<h3></h3>");
		$('#guess').val("");
	});

	$('#hint').click(function() {
		$('#answer').replaceWith("<div id='answer'><span>pssst, the number is "+mysteryNum+"</span></div>");
		$('span').fadeOut(1200);
	});
});
