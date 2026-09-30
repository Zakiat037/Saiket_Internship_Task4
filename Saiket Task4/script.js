const quizData = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "None"], answer: 0 },
  { question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], answer: 2 },
  { question: "Which is NOT a JavaScript framework?", options: ["React", "Angular", "Vue", "Django"], answer: 3 },
]

let current = 0;
let score = 0;
let selected = null;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const errorElement = document.getElementById('error');
const resultElement = document.getElementById('result');
const quizElement = document.getElementById('quiz');

function loadQuestion(){
  selected = null;
  errorElement.style.display = 'none';
  questionElement.textContent = `${current+1}. ${quizData[current].question}`;
  optionsElement.innerHTML = '';
  quizData[current].options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.textContent = opt;
    btn.onclick = () => selectOption(i, btn);
    optionsElement.appendChild(btn);
  });
}

function selectOption(index, btn){
  selected = index;
  document.querySelectorAll('.option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  errorElement.style.display = 'none';
}

nextBtn.addEventListener('click', () => {
  if(selected === null){
    errorElement.style.display = 'block';
    return;
  }
  if(selected === quizData[current].answer) score++;
  current++;
  if(current < quizData.length) loadQuestion();
  else showResult();
});

function showResult(){
  quizElement.classList.add('hidden');
  resultElement.classList.remove('hidden');
  document.getElementById('score').textContent = score;
}

loadQuestion();