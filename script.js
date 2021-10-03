// Question Sınıfı
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer.toLowerCase();
    }
    // kullanıcının seçimi ile cevabın aynı olduğunu karşılaştırıyorum.
    checkAnswer(answer) {
        return this.answer === answer; // cevap doğru ise true değeri gelir.
    }
}

//Quiz sınıfı
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.score = 0; // başlangıç puanı 0
        this.questionIndex = 0; // ilk sorunun 0. index olduğunu belirttik. Sırayla arttırılacak.
    }
    //Soruyu getiren metod ekledik.
    getQuestion() {
        return this.questions[this.questionIndex]; // questionIndex'i arttırarak sırayla    
                                                   // questions içerisindeki soruları getirecek.
    }
    //Son sorunun da sorulduğunu anlamak için metod ekledik.
    isFinish() {
        return this.questions.length === this.questionIndex; // toplam soru adedi, questionIndex'e eşit olduğunda   
                                                             // questions'ın son elemanı da getirilmiş olacağından quiz'in bittiğini anlayabiliriz. 
                                                             //Yani 3 sorumuz var ve questionIndex 4'e gelmişse son soru sorulmuş demektir. 
    }
    guess(answer) {
        let question = this.getQuestion(); // hangi sorudayım
        answer = answer.toLowerCase();
        console.log(answer);
        if (question.checkAnswer(answer)) { // soru doğru bilinirse
            this.score = this.score + 10; // score'u 10'ar arttır  
        }

        this.questionIndex++; // bir sonraki soruya geç
    }
}

// soruları Question constructor'ından oluşturuyoruz.
let q1 = new Question("What is the best programing?", ["C#","JavaScript","Python","C#"],"JavaScript");
let q2 = new Question("What is the most popular language?", ["C#","Visual Basic","NodeJs","JavaScript"], "JavaScript");
let q3 = new Question("What is the most popular language?", ["C#","Visual Basic","NodeJs","JavaScript"], "JavaScript");

let questions = [q1,q2,q3] // soruları tutan array.
let footer =  document.getElementById('progress')



// Start Quiz
let quiz = new Quiz(questions);

loadQuestion(); // quizi başlatması için oluşturduk

function loadQuestion(){
    if(quiz.isFinish()){
        showScore(); // quiz bitti ise sonucu göster

    }else{

        let question = quiz.getQuestion() // sıradaki soruyu al
        let choices = question.choices; // sorunun cevaplarını al
      
        document.getElementById('question').textContent = question.text; // soruyu ekrana bas

        for(let i=0;i<choices.length;i++){ // buttonların içine sorunun şıklarını bastık
            document.querySelector('#choice'+i).innerHTML = choices[i]

            guess('btn'+i,choices[i]); // herbir soru için bu fonksiyonu çalıştır.

        }
        showProgress(); // her soru sonrası soru sürecini footer'da göster
    }
}

function guess(id,guess){ // burası herbir soru için çalışır.

    let btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion(); // bir sonraki soruya geçip aynı işlemler için beklemede kalsın diye.
    }

}

function showScore(){
    let html = `<h2>Score:</h2><h4>${quiz.score} points.</h4>`
    document.querySelector('.card-body').innerHTML = html;
    footer.innerHTML="All questions answered."
}

function showProgress(){
    let totalQuestion = quiz.questions.length;
    let currentQuestion = quiz.questionIndex+1;
    footer.innerHTML = `Question ${currentQuestion} of ${totalQuestion} questions.`;      
}
