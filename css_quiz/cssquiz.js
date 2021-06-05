let startQuiz = document.querySelector("#startquiz");
let message_jumbotron = document.querySelector(".message_jumbotron");
let quiz_jumbotron = document.querySelector(".quiz_jumbotron");
let quizarea = document.querySelector(".quizarea");


startQuiz.addEventListener('click', e=>{
    e.preventDefault();
    message_jumbotron.style.display = "none";
    quiz_jumbotron.style.display = "block";
    display_quiz();
    
})



// for all questions
function Quiz(questions)
{
    this.resultScore = 0;
    this.questions = questions;
    this.questionIndex=0;
    this.wrongAnswer = 0;
}



// get question index 
Quiz.prototype.getQuestionIndex = function(){
    return this.questions[this.questionIndex];
}





// check the quiz answer
Quiz.prototype.checkQuizAnswer = function(choiceAnswer){
    if(this.getQuestionIndex().isCorrectAnswer(choiceAnswer))
    {
        this.resultScore++;

        let correctCount = document.querySelector("#correctCount");
        correctCount.innerHTML = "Correct Answers ("+this.resultScore+")";
    }
    else{
        this.wrongAnswer++;

        let wrongCount = document.querySelector("#wrongCount");
        wrongCount.innerHTML = "Wrong Answers ("+this.wrongAnswer+")";
    }

    this.questionIndex++;
}




// putting Question arguments into variables
function Question(question,choices,answer)
{
    this.question = question;
    this.choices = choices;
    this.answer = answer;
}




// checking the answer is correct or not
Question.prototype.isCorrectAnswer = function(choiceAnswer){
    return this.answer === choiceAnswer;
}




// check this is the last quiz or not
Quiz.prototype.isEnded = function(){
    return this.questionIndex == this.questions.length;
}

// creating two global variables
var count , counter;

// display quiz data
function display_quiz()
{
    if(quiz.isEnded())
    {
        showResultScores();
    }
    else
    {
        // show question
        let question = document.querySelector("#question");
        question.innerHTML = "<span class='text-success font-weight-bold'> Q."+ (quiz.questionIndex+1) +" - </span>"+quiz.getQuestionIndex().question;

        // show choices
        let choices = quiz.getQuestionIndex().choices;
        for(let i=0 ; i<choices.length ; i++)
        {
            let element = document.querySelector("#btext" + (i+1));
            element.innerHTML = choices[i];

            // passing button id and it's text
            checkChoice('b'+ (i+1), choices[i]);
        }

        // calling a function to display current question no. and total no. of questions
        currentQuestionAndTotal();



        count = 31;
        counter = setInterval(timer,1000);

        function timer(){
            count--;
            if(count <= 0){
                // clear set interval 
                clearInterval(counter);
                
                // check the answer and make quiz exam continue forward   
                quiz.checkQuizAnswer("");  
                // give an empty argument to show that user have not clicked the option within given time
                    
                // again call display quiz funtion
                display_quiz();
            }
        
            let timeLeft = document.querySelector("#time_left");
            timeLeft.innerHTML = "Time Left : "+count+" s";
        
        }

      
    }
}






// checking which button is clicked
function checkChoice(id,choiceAnswer)
{
    let btn = document.getElementById(id);
    btn.onclick = function(){
        // check the answer and make quiz exam continue forward
        quiz.checkQuizAnswer(choiceAnswer);

        // clear the interval that already running
        clearInterval(counter);
        
        // again call display quiz funtion
        display_quiz();     
    }
}





// show current question no. and total no. of questions
function currentQuestionAndTotal()
{
    let display = document.querySelector("#question_progress");
    let currentQuestionNumber = quiz.questionIndex+1;
    display.innerHTML = "Question "+ currentQuestionNumber + " of "+ quiz.questions.length;
}




// show total obtain score after quiz
function showResultScores(){
    let resultPanel = document.querySelector(".quiz_jumbotron");
    let data = "<h3>Your Score Result</h3>";
    data += "<h2 class='text-warning'>"+ quiz.resultScore +"</h2>";
    data += "<a href='cssquiz.html' class='btn btn-success'>Take Quiz Again</a>"
    resultPanel.innerHTML = data;
    resultPanel.style.textAlign = "center";
}




// create question from here
var questions=[
    new Question("How can you created rounded corners using CSS3?", ["border[round]:30px", "corner-effect:round","border-radius:20px", "none of above"], "border-radius:20px"),
    new Question("Which of these are valid CSS3 transformation statements.", ["matrix()", "modify()", "skip()", "simultae()"], "matrix()"),
    new Question("Box-Shadow is a property that allows developers to apply a....", ["Border", "Drop Shadow","Rounded Corner", "Background"], "Drop Shadow"),
    new Question("If we don't want to allow a floating div to the left side of an element, which css property will we use ?", ["margin", "clear", "float", "padding"], "clear"),
    new Question("What should be the table width, so that the width of a table adjust to the current width of the browser window?", ["640px", "100%","full screen","1024px"], "100%"),
    new Question("Which attribute can be added to many HTML / XHTML elements to identify them as a member of a specific group ?", ["id", "div","class","span"], "class"),
    new Question("Which css property you will use if you want to add some margin between a DIV's border and its inner text ?", ["spacing", "margin","padding","outer-margin"], "padding"),
    new Question("Which CSS property is used to control the text size of an element ?", ["font-style", "text-size","font-size","text-style"], "font-size"),
    new Question("The default value of position attribute is _________.", ["fixed", "relative","absolute","inherit"], "relative"),
    new Question("How will you make all paragraph elements 'RED' in color ?", ["p.all {color: red;}", "p.all {color: #990000;}","p {color: red;}","none of above"], "p {color: red;}")

];



// create quiz
var quiz = new Quiz(questions);

