$(document).ready(function () {
    var currentQuestion;
    var timeLeft = 10;
    var score = 0;
    var highScore = 0;
    var interval;

    var randomNumberGenerator = function (size) {
        return Math.ceil(Math.random() * size);
    };

    var questionGenerator = function () {
        var question = {};
        var num1 = randomNumberGenerator(10);
        var num2 = randomNumberGenerator(10);

        var operations = ['+', '-', '*', '/'];
        var operation = operations[Math.floor(Math.random() * operations.length)];

        if (operation === '+') {
            question.answer = num1 + num2;
            question.equation = `${num1} + ${num2}`;
        } else if (operation === '-') {
            question.answer = Math.abs(num1 - num2);
            question.equation = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
        } else if (operation === '*') {
            question.answer = num1 * num2;
            question.equation = `${num1} * ${num2}`;
        } else if (operation === '/') {
            num2 = num2 === 0 ? 1 : num2;
            const adjustedNum1 = num1 * num2;
            question.answer = adjustedNum1 / num2;
            question.equation = `${adjustedNum1} / ${num2}`;
        }

        return question;
    };

    var renderNewQuestion = function () {
        currentQuestion = questionGenerator();
        $('#question').text(currentQuestion.equation);
    };

    var updateTimeLeft = function (amount) {
        timeLeft += amount;
        $('#time-left').text("Time Left: " + timeLeft);
    };

    var checkAnswer = function (userInput) {
        const tolerance = 0.01;
        if (Math.abs(userInput - currentQuestion.answer) < tolerance) {
            score++;
            updateTimeLeft(1);
            $('#score').text("Score: " + score);
            if (score > highScore) {
                highScore = score;
                $('#high-score').text("High Score: " + highScore);
            }
            renderNewQuestion();
            $('#user-input').val('');
        }
    };

    var startGame = function () {
        timeLeft = 10;
        score = 0;
        $('#time-left').text("Time Left: " + timeLeft);
        $('#score').text("Score: " + score);
        $('#high-score').text("High Score: " + highScore);
        $('#user-input').val('').focus();
        $('#user-input').prop('disabled', false);
        renderNewQuestion();

        clearInterval(interval);
        interval = setInterval(function () {
            updateTimeLeft(-1);
            if (timeLeft <= 0) {
                clearInterval(interval);
                $('#user-input').prop('disabled', true);
                alert("Time's up! Game over.");
            }
        }, 1000);
    };

    $('#user-input').on('keyup', function () {
        const userInput = parseFloat($(this).val());
        if (!isNaN(userInput)) {
            checkAnswer(userInput);
        }
    });

    $('#start-button').on('click', function () {
        startGame();
    });
});
