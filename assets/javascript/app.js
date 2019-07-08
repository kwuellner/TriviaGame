var correctAnswer = 0;
var wrongAnswer = 0;
var unansweredQuestions = 0;
var currentQuestion = 0;
var timeRemaining = 20;
var timerOn = false;
var timerId = '';
var nextQuestion = '';

$('#time-left').hide();
$('#start').on('click', beginGame);
$(document).on('click', '.option', guessVarify);

console.log(nextQuestion);
var trivia = [{
    question: "Which restaurant chain did Pam get banned from?",
    choices: ["Chili's", "Benihana", "Applebee's", "TGIF"],
    answer: ["Chili's"]
},

{
    question: "Who is Michael's favorite actress?",
    choices: ["Angela Lansbury", "Audrey Hepburn", "Meryl Streep", "Viven Leigh"],
    answer: ["Meryl Streep"]
},

{
    question: "Which movie does Dwight reference during CPR training?",
    choices: ["Chucky", "Silence of the Lambs", "Ramboo", "Sixteen Candles"],
    answer: ["Silence of the Lambs"]
},

{
    question: "Who does Michael run over with his car?",
    choices: ["Phylis", "Pam", "Meredith", "Angela"],
    answer: ["Meredith"]
},

{
    question: "What is Andy's nickname for Jim?",
    choices: ["Jimbo", "Guy", "John", "Big Tuna"],
    answer: ["Big Tuna"]
},

{
    question: "What Smells like death in Creed's desk?",
    choices: ["Broccoli", "Mung Beans", "Fermented Grapes", "Week Old Lunch"],
    answer: ["Mung Beans"]
},

{
    question: "Micheal burns his foot on what?",
    choices: ["Coffee Pot", "Oven", "Toaster", "George Foreman Grill"],
    answer: ["George Foreman Grill"]
},

{
    question: "Who spills the pot of chili?",
    choices: ["Kevin", "Jim", "Oscar", "Daryl"],
    answer: ["Kevin"]
},

{
    question: "How does future Dwight communicate with present Dwight",
    choices: ["Email", "Fax", "Phone Call", "Visions"],
    answer: ["Fax"]
},

{
    question: "How many different pretzel toppings do they have for Pretzel Day?",
    choices: ["24", "10", "18", "6"],
    answer: ["18"]
},

{
    question: "Who gets abandoned in the lake wearing a sumo suit?",
    choices: ["Andy", "Pam", "Roy", "Micael"],
    answer: ["Andy"]
}];

function beginGame() {
    currentQuestion = 0;
    correctAnswer = 0;
    wrongAnswer = 0;
    unansweredQuestions = 0;
    clearInterval(timerId);

    $('#game-container').show();
    $('#results').html('');
    $('#timer').text(timeRemaining);
    $('#start').hide();
    $('#time-left').show();
    nextQuestion;
}


function nextQuestion() {
    timeRemaining = 20;
    $('#timer').removeClass('last-seconds');
    $('#timer').text(timeRemaining);

    if (!timerOn) {
        timerId = setInterval(runTime, 1000);
    }

    var questionContent = Object.values(question)[currentQuestion];
    $('#questions').text(questionContent);

    var questionOptions = Object.values(choices)[currentQuestion];

    $.each(questionOptions, function (index, key) {
        $('#choices').append($('<button class="btn btn-secondary btn-lg">' + key + '</button>'));
    })
}

function runTime() {
    if (timeRemaining > -1 && currentQuestion < Object.keys(question).length) {
        $('#timer').text(timeRemaining);
        timeRemaining--;
        if (timeRemaining === 4) {
            $('#timer').addClass('last-seconds');
        }
    }

    else if (timeRemaining === -1) {
        unansweredQuestions++;
        result = false;
        clearInterval(timerId);
        resultsId = setTimeout(guessResult, 1000);
        $('#results').html('<h3>Time is up! The answer was ' + Object.values(answer)[currentQuestion] + '</h3>');
    }

    else if (currentQuestion === Object.keys(question).length) {
        $('#results')
            .html('<h3>Thanks for playing!</h3>' +
                '<p>Correct: ' + correctAnswer + '</p>' +
                '<p>Incorrect: ' + wrongAnswer + '</p>' +
                '<p>Unaswered: ' + unansweredQuestions + '</p>');

        $('#game').hide();

        $('#start').show();
    }
}

function guessVarify() {
    var resultsId;

    var currentAnswer = Object.values(answer)[currentQuestion];

    if ($(this).text() === currentAnswer) {
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(timerId);
        resultsId = setTimeout(guessResult, 1000);
        $('#results').html('<h3>Correct!</h3>');
    }

    else {
        $(this).addClass('btn-danger').removeClass('btn-info');
        trivia.incorrect++;
        clearInterval(timerId);
        resultsId = setTimeout(guessResult, 1000);
        $('#results').html('<h3>Nope! Sorry!' + currentAnswer + '</h3>');
    }
}


function guessResult() {
    currentQuestion++;
    $('.option').remove();
    $('#results h3').remove();

    nextQuestion();
}


