    var submitButton = document.getElementById("submit-button");
    var inputElement = document.getElementById("initials");

    // When button is clicked, save users score and initials. 
    submitButton.addEventListener("click", saveScore);

    function saveScore(event) {
        event.preventDefault();

        // Alerts user if they fail to enter initials.
        if (!inputElement.value) {
            alert("Enter your initials before submitting!")
            return;
        }

        var leaderboardName = {
            initials: inputElement.value,
            score: timer,
        };

        updateSavedLeaderboard(leaderboardName);

        // Display the leaderboard.
        hideBoxes();
        leaderboardBox.removeAttribute("hidden");
        
        renderLeaderboard();
    }

    // Store leaderboard in local storage. 
    function updateSavedLeaderboard(leaderboardName) {
        var leaderboardArray = getLeaderboard();
        leaderboardArray.push(leaderboardName);
        localStorage.setItem("leaderboardArray",JSON.stringify(leaderboardArray));
    }

    // get leaderboard from local storage.
    function getLeaderboard() {
        var savedLeaderboard = localStorage.getItem("leaderboardArray");
        if (savedLeaderboard !== null) {
          var leaderboardArray = JSON.parse(savedLeaderboard);
          return leaderboardArray;
        } else {
          leaderboardArray = [];
        }
        return leaderboardArray;
      }

    //  Display leaderboard.
    function renderLeaderboard() {
        var sortedLeaderboardArray = sortLeaderboard();
        var highscores = document.getElementById("highscores");
        highscores.innerHTML = "";
        for (var i = 0; i < sortedLeaderboardArray.length; i++) {
            var leaderboardEntry = sortedLeaderboardArray[i];
            var newListEntry = document.createElement("li");
            newListEntry.textContent = leaderboardEntry.initials + " - " + leaderboardEntry.score;
            highscores.append(newListEntry);
        }
    }

    // Arrange scores from highest to lowest
    function sortLeaderboard() {
        var leaderboardArray = getLeaderboard();
        if (!leaderboardArray) {
          return;
        }
      
        leaderboardArray.sort(function (a, b) {
          return b.score - a.score;
        });
        return leaderboardArray;
    }

    // Clear button removes scores from local storage.
    var clearButton = document.getElementById("clear-button");
    clearButton.addEventListener("click", clearHighscores);

    function clearHighscores() {
        localStorage.clear();
        renderLeaderboard();
    }

    // Click button to return to start page
    var returnButton = document.getElementById("return-button");
    returnButton.addEventListener("click", returnToStart);

    function returnToStart() {
        hideBoxes();
        startBox.removeAttribute("hidden");
    }

    // Click button to view highscore page
    var leaderboardLink = document.getElementById("leaderboard-link");
    leaderboardLink.addEventListener("click", showLeaderboard);

    function showLeaderboard() {
        hideBoxes();
        leaderboardBox.removeAttribute("hidden");

        clearInterval(interval);

        timer = undefined;
        displayTimer();

        renderLeaderboard();
    }

