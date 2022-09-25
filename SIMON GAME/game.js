var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var key = 0;

var level = 0;

function nextSequence() {
    
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
}
$(".btn").on("click" , function(){
    var userChosenColour = $(this).attr("id");
 
   userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 }); 

$(document).on("keypress" , function(){
    if(key == 0){
        $("#level-title").text("Level " + level);
        nextSequence();
        key = 1;
    }
    });

function playSound(name){
    var aud = new Audio("sounds/"+name+".mp3");
    aud.play();
}

function animatePress(colors){
    $("."+colors).addClass("pressed");
    setTimeout(function () {
        $("." + colors).removeClass("pressed");
      }, 100);

}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        } , 200);
        replay();
        
    }
}
function replay(){
    key = 0
    level = 0;
    gamePattern = [];
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

}


