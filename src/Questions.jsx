import { nanoid } from 'nanoid'
import { useState } from 'react'

export default function Questions(props) {

    function checkAnswers() {
        // provide score at bottom with "Play again button"

        if (props.allAnswers.filter(answers => answers.some(answer => answer.isChecked)).length < 5) {
            // check for all questions guessed
            return console.log("need to make a guess for every question")
        }

        props.setAllAnswers(prevAllAnswers => prevAllAnswers.map(answers => answers.map(answer =>  {
            console.log("in checkAnswers answer: ", answer)
            return answer.isCorrect ? {...answer, isChecked: false, isDisabled: true, endClasses: "green"} :
                answer.isChecked && !answer.isCorrect ? {...answer, isChecked: false, isDisabled: true, endClasses: "red opaque"} :
                {...answer, isChecked: false, isDisabled: true, endClasses: "opaque"} 
        })))
    }

    function setAnswer(e) {
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        
        props.setAllAnswers(prevAnswers => prevAnswers.map(answers => answers.map(answer => {
            // console.log(answer)
            return value === answer.answer ? {...answer, isChecked: true} : 
                    value !== answer.answer && name === answer.qId ? {...answer, isChecked: false} :
                    answer
        })))
    }

    const showQuestions = props.questions.map((question, index) => {
     
        const answers = props.allAnswers.map(answers =>  {
            return answers.filter(answer => answer.qId === question.id).map(answer => { 
                return <li key={answer.id}><label className={answer.endClasses}>{answer.answer}
                    <input  
                        type="radio" 
                        name={question.id} 
                        value={answer.answer} 
                        checked={answer.isChecked} 
                        onChange={setAnswer} 
                        disabled={answer.isDisabled}/>
                </label></li>
            })
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