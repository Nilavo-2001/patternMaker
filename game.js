// Global arrays and variables
var gamePattern = []; // for storing computer generated pattern
var lev = 1; // for game level
var gameStarted = false;
var computerMode = false; // to check if the board is showing any pattern
var compare = 0; // used to check each index of game pattern with user input
var interval = 4000; // to set the time interval two flashes
var firstPlay = true; // to check if user is playong first time
//different sounds//
var blockFlash = new Audio("sounds/blue.mp3");
var inputSound = new Audio("sounds/green.mp3");
var winner = new Audio("sounds/sucess.mp3");
var failed = new Audio("sounds/wrong.mp3");
var gameStart = new Audio("sounds/gamestart.mp3");

//start button
$(".start").click(function (e) {
  if (!gameStarted) {
    $("body").removeClass("failed");
    $(".start").text("start");
    computerMode = true;
    if (firstPlay) {
      introEffect();
      setTimeout(startGame, 19700);
      firstPlay = false;
    } else {
      startGame();
    }
    gameStarted = true;
  }
});
// to start game after animation
function startGame() {
  $("#title").text("Level " + lev);
  gameStart.play();
  setTimeout(patternGenerator, 2400);
}
//to generate a pattern
function patternGenerator() {
  // console.log(interval);
  var time = 0;
  for (let i = 1; i <= lev; i++) {
    let randomNumber = Math.floor(Math.random() * 12) + 1;
    gamePattern.push("b" + randomNumber);
    setTimeout(function () {
      animateSound(randomNumber);
      if (i == lev) {
        computerMode = false;
      }
    }, time);
    time += interval;
  }
  //console.log(gamePattern);
}
//User click
$(".box").click(function (e) {
  if (computerMode) {
    return;
  }
  var box = this.id;
  $("#" + box).addClass("flash");
  setTimeout(function () {
    $("#" + box).removeClass("flash");
  }, 100);
  inputSound.play();
  if (gameStarted) checkAns(box);
});
//check for valid input
function checkAns(box) {
  if (gamePattern[compare] === box) {
    // console.log("sucess");
    compare++;
    if (compare == gamePattern.length) {
      if (interval > 600) speed();
      lev++;
      gamePattern = [];
      compare = 0;
      $("body").addClass("sucess");
      winner.play();
      setTimeout(function () {
        $("body").removeClass("sucess");
        $("#title").text("Level " + lev);
        computerMode = true;
        patternGenerator();
      }, 2000);
    }
  } else {
    $("body").addClass("failed");
    $("#title").text("Game Over,Press restart");
    failed.play();
    startOver();
  }
}
//startover
function startOver() {
  gamePattern = [];
  lev = 1;
  compare = 0;
  gameStarted = false;
  interval = 2600;
  $(".start").text("restart");
}
function speed() {
  if (interval - 700 >= 600) {
    interval -= 700;
  } else {
    interval = 600;
  }
}
//animations
//into effect when played after browser loading
function introEffect() {
  var i = 0;
  var txt =
    "The board will show you a pattern by flashing level number of boxes"; /* The text */
  $("#title").text("");
  typeWriter();
  setTimeout(typeWriter, 12000);
  function typeWriter() {
    if (i == txt.length) {
      i = 0;
      setTimeout(() => {
        $("#title").text("");
      }, 1500);
      txt = "To win repeat the pattern after board";
      return;
    }
    $("#title").text($("#title").text() + txt.charAt(i));
    i++;
    setTimeout(typeWriter, 150);
  }
}
//to animate and play bgse
function animateSound(num) {
  $("#b" + num).addClass("flash");
  setTimeout(function () {
    $("#b" + num).removeClass("flash");
  }, 500);
  blockFlash.play();
}
