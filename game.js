
$(document).ready(function() {

  
    var buttonColours = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var started = false;


    function nextSequence() {

        userClickedPattern = [];
        level++;

        $("h1").text("Level " + level);

        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];

        gamePattern.push(randomChosenColour);

        $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

        playSound(randomChosenColour);
    }


 
    $(".btn").on("click", function() {

        if (started) {

            var userChosenColour = $(this).attr("id");

            userClickedPattern.push(userChosenColour);

            playSound(userChosenColour);
            animatePress(userChosenColour);

            checkAnswer(userClickedPattern.length - 1);

        }

    });



    function playSound(name) {

        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();

    }


 
    function animatePress(currentColour) {

        $("#" + currentColour).addClass("pressed");

        setTimeout(function() {
            $("#" + currentColour).removeClass("pressed");
        }, 100);

    }


   
    $(document).on("keypress", function() {

        if (!started) {
            started = true;
            nextSequence();
        }

    });


   
    function checkAnswer(currentLevel) {

        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

            if (userClickedPattern.length === gamePattern.length) {

                setTimeout(function() {
                    nextSequence();
                }, 1000);

            }

        } else {

         
            playSound("wrong");

            $("body").addClass("game-over");

            $("h1").text("Game Over, Press Any Key to Restart");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

           
            startOver();

        }

    }



    function startOver() {

        level = 0;
        gamePattern = [];
        started = false;

    }

});
