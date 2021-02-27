const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [

  {
    question: 'Which of the following is the major inhibitory neurotransmitter in the brainstem and spinal chord?',
    answers: [
      { text: 'Glycine', correct: true }, /*question 2 Appendix A Groupwork*/
      { text: 'Aspartate', correct: false }, /*https://docs.google.com/document/d/1FysOzYwPa6OOZRJJJRopRuehLpAOc69mPAR1krpUWAo/edit#*/
      { text: 'Dopamine', correct: false },
      { text: 'Enkephalin', correct: false }
    ]
  },
  {question: 'Cocaine addiction is related to which brain area?',/*question 4*/
    answers: [
      { text: 'Nucleus Accumbens', correct: true },
      { text: 'Ventral Tegmental Area', correct: false },
      { text: 'Frontal Cortex', correct: false },
      { text: 'Ventral Pallidum', correct: false }
    ]
  },

  {
    question: 'Which neurotransmitter pathway projects through the prefrontal cortex?', //question 5
    answers: [
      { text: 'The acetylcholine pathway', correct: false },
      { text: 'The dopamine pathway', correct: true },
      { text: 'The norepinephrine pathway', correct: false },
      { text: 'The serotonin pathway', correct: false }
    ]
  },

  {
    question: 'Which of the following is the main inhibitory neurotransmitter in the adult brain?', //question 6
    answers: [
      { text: 'Glycine', correct: false },
      { text: 'GABA', correct: true },
      { text: 'Serotonin', correct: false },
      { text: 'Acetylcholine', correct: false }
    ]
  },

  {
    question: ' Which of the following drugs do not affect the nucleus accumbens?', //question 7
    answers: [
      { text: 'Amphetamines', correct: false },
      { text: 'Cocaine', correct: false },
      { text: 'Cannabis', correct: false },
      { text: 'Nicotine', correct: true }
    ]
  },

  {
    question: ' Which of the following is a role of norepinephrine?', //question 12
    answers: [
      { text: 'Emotional processing', correct: false },
      { text: 'Psychosis', correct: true },
      { text: 'Movement', correct: false },
      { text: 'Pain', correct: false }
    ]
  },
]
