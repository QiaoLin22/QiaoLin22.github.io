const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const titleframe = document.getElementById('title')

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
  titleframe.classList.add('hide')
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
    question: '说出ntr的全称',
    answers: [
      { text: 'netorase', correct: false },
      { text: 'netorareta', correct: false },
      { text: 'netorare', correct: true},
      { text: 'netori', correct: false}
    ]
  },
  {
    question: '最高等级牛头人一般将自己代入哪个角色?',
    answers: [
      { text: '苦主', correct: false },
      { text: '黄毛', correct: false },
      { text: '女主', correct: true },
      { text: '其他人', correct: false }
    ]
  },
  {
    question: '以下哪部游戏作品不是ntr题材?',
    answers: [
      { text: '对魔忍', correct: false },
      { text: '爱妻日记', correct: false },
      { text: '光翼戦姫エクスティア', correct: false },
      { text: '秋色之空', correct: true }
    ]
  },
  {
    question: '以下哪个作者不是ntr画师?',
    answers: [
      { text: '水龙敬', correct: false },
      { text: '武田弘光', correct: false },
      { text: 'あらくれ', correct: false },
      { text: '生クリームびより', correct: true }
    ]
  },
  {
    question: '以下哪部同人作品不是ntr题材?',
    answers: [
      { text: 'みだれうち', correct: false },
      { text: 'カラミざかり', correct: false },
      { text: 'ずっと信じてる', correct: false },
      { text: '週末のたわわ', correct: false }
    ]
  }
]