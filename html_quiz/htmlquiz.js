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
    data += "<a href='htmlquiz.html' class='btn btn-success'>Take Quiz Again</a>"
    resultPanel.innerHTML = data;
    resultPanel.style.textAlign = "center";
}




// create question from here
var questions=[
    new Question("Which of the following attributes is used to add link to any element?", ["link", "ref","href", "newref"], "href"),
    new Question("Which of the following attributes is used to open an hyperlink in new tab?", ["tab", "href", "target", "ref"], "target"),
    new Question("Which tag is used for creating a drop-down selection list?", ["select", "option","dropdown", "list"], "select"),
    new Question("What tag will create a line break?", ["Title tag", "List tag", "Break tag", "Body tag"], "Break tag"),
    new Question("When adding color to a HTML document the user may use the name of the color or the color value.", ["True", "False","Only name","Only value"], "True"),
    new Question("How can you make a bulleted list?", ["list", "nl","ul","ol"], "ul"),
    new Question("Which attribute is used to name an element uniquely?", ["class", "id","dot","all of above"], "id"),
    new Question("Which of the following is not a pair tag?", ["p", "span","i","img"], "img"),
    new Question("HTML documents are saved in", ["Special binary format", "Machine language codes","ASCII text","None of above"], "ASCII text"),
    new Question("Which tag inserts a line horizontally on your web page?", ["hr", "line","line direction='horizental'","tr"], "hr")

];



// create quiz
var quiz = new Quiz(questions);

