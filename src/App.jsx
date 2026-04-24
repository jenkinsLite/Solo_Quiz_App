import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'
import Intro from './Intro'
import Questions from './Questions'

function App() {

  const [questions, setQuestions] = useState([])
  const [allAnswers, setAllAnswers] = useState([])

  function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {

        const allData = data.results.map(result => {

          const qId = nanoid()
          const randIndex = Math.floor(Math.random() * result.incorrect_answers.length)
          const splicedAnswers = result.incorrect_answers.toSpliced(randIndex, 0, result.correct_answer) 

          const question =
            {
              id: qId,
              question: result.question
            }
          

          const answers = splicedAnswers.map(answer => {
            return { 
              id: nanoid(),
              answer: answer, 
              isCorrect: answer === result.correct_answer, 
              point: 0,
              isChecked: false, 
              isDisabled: false,
              endClasses: "",
              qId: qId 
            }
          })
          return { question: question, answers: answers }
        })
        setQuestions(allData.map(data => data.question))
        setAllAnswers(allData.map(data => data.answers))
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
         <Questions questions={questions} 
                    setQuestions={setQuestions} 
                    allAnswers={allAnswers}
                    setAllAnswers={setAllAnswers}
                    getQuestions={getQuestions}
        />}
      </main>
    </>
  )
}

export default App
