// Quiz questions and answers are sorted in array.
var questions = [
    {
        questionText: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        questionText: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        questionText: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        questionText: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log"
    },
    ];

    // Assign ID's to variables 
    var startBox = document.getElementById("start-box");
    var questionBox = document.getElementById("question-box");
    var scoreBox = document.getElementById("score-box");
    var leaderboardBox = document.getElementById("leaderboard-box");

    // Hide variables
    function hideBoxes() {
        startBox.setAttribute("hidden", true);
        questionBox.setAttribute("hidden", true);
        scoreBox.setAttribute("hidden", true);
        leaderboardBox.setAttribute("hidden", true);
    }

    var answerDiv = document.getElementById("answer-div");
    var answerText = document.getElementById("answer-text");

    // Hide answer
    function hideAnswerText() {
        answerDiv.style.display = "none";
    }

    var interval;
    var timer;
    var currentQuestion;

    document.getElementById("start-button").addEventListener("click", beginQuiz);

    // Begin quiz, hide any visible items and reveal the question. Set and display timer for 10 seconds per question.
    function beginQuiz() {
        hideBoxes();
        questionBox.removeAttribute("hidden");

        currentQuestion = 0;
        displayQuestion();

        timer = questions.length *10;

        interval = setInterval(countdown, 1000);

        displayTimer();
    }

    // End the quiz if timer runs out.
    function countdown() {
        timer-- ;
        displayTimer();
        if (timer < 1) {
            endQuiz();
        }
    }

    // Timer displayed on screen 
    var timerDisplay = document.getElementById("timer")
    function displayTimer() {
        timerDisplay.textContent = timer;
    }

    // Question and choices are displayed on screen.
    function displayQuestion() {
        var question = questions[currentQuestion];
        var choices = question.choices;

        var h2QuestionEl = document.getElementById("question-text");
        h2QuestionEl.textContent = question.questionText

        for (var i = 0; i < choices.length; i++) {
            var choice = choices[i];
            var choiceButton = document.getElementById("choice" + i);
            choiceButton.textContent = choice;
        }
    }

    document.getElementById("question-choices").addEventListener("click", checkAnswer);

    // Compare answer selection with the correct question answer.
    function choiceIsCorrect(choiceButton) {
        return choiceButton.textContent === questions[currentQuestion].answer;
    }

    // Display whether answer is correct or wrong. If answer is wrong, the user loses 10 seconds on timer.
    function checkAnswer(eventObject) {
        var choiceButton = eventObject.target;
        answerDiv.style.display = "block";
        if (choiceIsCorrect(choiceButton)) {
            answerText.textContent = "Correct!";
            setTimeout(hideAnswerText, 1000);
        } else {
            answerText.textContent = "Wrong!";
            setTimeout(hideAnswerText, 1000);
            if (timer >= 10) {
                timer = timer - 10;
                displayTimer();
            }   else {
                timer = 0
                displayTimer();
                endQuiz();
            }
        }

        currentQuestion++;

        // Display next question. If user reaches the final question, then end the quiz.
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    var score = document.getElementById("score");

    // When the quiz ends, display score.
    function endQuiz() {
        clearInterval(interval);
        hideBoxes();
        scoreBox.removeAttribute("hidden");
        score.textContent = timer;
    }