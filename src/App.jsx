import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Intro from './Intro'
import Questions from './Questions'

function App() {

  const [questions, setQuestions] = useState([])

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results.map(result => {

          const id = nanoid()
          const randIndex = Math.floor(Math.random() * result.incorrect_answers.length)
          const splicedAnswers = result.incorrect_answers.toSpliced(randIndex, 0, result.correct_answer) 
          const allAnswers = splicedAnswers.map(answer => ({ 
            answer: answer, 
            isCorrect: answer === result.correct_answer, 
            isChecked: false, 
            qId: id 
          }))

          return  {
            id: id,
            question: result.question,
            allAnswers: allAnswers 
          }
          
        }))
    })
  }

  return (
    <>
      <div className="background">
        <img className="yellow" src="./src/assets/yellow-blob.png" />
        <img className="blue" src="./src/assets/blue-blob.png" />
      </div>
      <main>
        {questions.length === 0 ? <Intro getQuestions={getQuestions} /> : 
         <Questions questions={questions} setQuestions={setQuestions}/>}
      </main>
    </>
  )
}

export default App
