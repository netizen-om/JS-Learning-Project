document.addEventListener("DOMContentLoaded" , () => {

    const questionContainer = document.getElementById("question-container");
    const questionText = document.getElementById("question-text");
    const choiceList = document.getElementById("choices-list");
    const nextBtn = document.getElementById("next-btn");
    const resultContainer = document.getElementById("result-container");
    const score = document.getElementById("score");
    const restartBtn = document.getElementById("restart-btn");
    const startBtn = document.getElementById("start-btn");

    let currentQuestion = 0;
    let correctAns = 0;

    const questions = [
        {
          question: "What is the capital of France?",
          choices: ["Paris", "London", "Berlin", "Madrid"],
          answer: "Paris",
        },
        {
          question: "Which planet is known as the Red Planet?",
          choices: ["Mars", "Venus", "Jupiter", "Saturn"],
          answer: "Mars",
        },
        {
          question: "Who wrote 'Hamlet'?",
          choices: [
            "Charles Dickens",
            "Jane Austen",
            "William Shakespeare",
            "Mark Twain",
          ],
          answer: "William Shakespeare",
        },
      ];

    startQuiz();

    function startQuiz(){
        startBtn.addEventListener("click" , () => {
            questionContainer.classList.remove("hidden")
            renderQuestions();
        })  
    }
    

    function renderQuestions(){
        startBtn.classList.add("hidden")
        choiceList.innerHTML = "";
            
           questionText.textContent = questions[currentQuestion].question; //try to put it above
           questions[currentQuestion].choices.forEach(choice => {
                const li = document.createElement("li");
                li.innerHTML = choice;
                li.addEventListener("click" , () => checkAns(choice))
                choiceList.appendChild(li);
            })

    }
    
    nextQuestion()

    function checkAns(choice){
      if(choice === questions[currentQuestion].answer) correctAns++;
      console.log(correctAns);
      nextBtn.classList.remove("hidden");
      
    }

    function nextQuestion() {
      nextBtn.addEventListener("click", () => {
        currentQuestion++;
        if (currentQuestion === questions.length) {
          questionContainer.classList.add("hidden");
          nextBtn.classList.add("hidden");
          score.textContent = `${correctAns}`;
          resultContainer.classList.remove("hidden");
          restartQuiz()
        } else {
          renderQuestions();
        }
      });
    }
    

    function restartQuiz(){
      restartBtn.addEventListener("click", () => {
        currentQuestion = 0;
        console.log("I'm in restart part");
        correctAns = 0;
        startBtn.classList.remove("hidden");
        restartBtn.classList.add("hidden");
        resultContainer.classList.add("hidden");
        startQuiz();
      });
      
    }
    
})