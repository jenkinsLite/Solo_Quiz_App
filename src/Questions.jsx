import { nanoid } from 'nanoid'
import { useState } from 'react'

export default function Questions(props) {

    function checkAnswers() {
        props.questions.map(question => {
            const guessedAnswer =  question.allAnswers.filter(answer => answer.isChecked)[0].answer
            const correctAnswer = question.allAnswers.filter(answer => answer.isCorrect)[0].answer
            const isGuessCorrect = question.allAnswers.some(answer => answer.isChecked && answer.isCorrect)
        })
    }

    function setAnswer(e) {
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        
        props.setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                return {...question, allAnswers: question.allAnswers.map(answers => {
                    return value === answers.answer ? {...answers, isChecked: true} : 
                           value !== answers.answer && name === answers.qId ? {...answers, isChecked: false} :
                           answers
                })}
            })    
        })
    }

    const showQuestions = props.questions.map(question => {

        const answers = question.allAnswers.map(answer => {
            return <li key={nanoid()}><label>{answer.answer}
                        <input 
                            type="radio" 
                            name={question.id} 
                            value={answer.answer} 
                            checked={answer.isChecked} 
                            onChange={setAnswer} 
                            />
                   </label></li>
        })

        return (
                <div key={question.id} className="questions-container">
                    <p>{question.question}</p>
                    <ul>
                        {answers} 
                    </ul>
                </div>
        )
    })

    return (
        <>
            {showQuestions}
            <button className="check-answers-btn" onClick={checkAnswers}>Check answers</button>
        </>
    )
}