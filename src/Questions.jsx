import { nanoid } from 'nanoid'
import { useState } from 'react'

export default function Questions(props) {

    const [areAnswersChecked, setAreAnswersChecked] = useState(false)

    function checkAnswers() {
        if(areAnswersChecked) { 
            setAreAnswersChecked(false)
            props.getQuestions() 
        } else { 
            props.setAllAnswers(prevAllAnswers => prevAllAnswers.map(answers => answers.map(answer =>  {
                return answer.isChecked && !answer.isCorrect ? {...answer, isChecked: false, isDisabled: true, endClasses: "red opaque"} :
                    answer.isChecked && answer.isCorrect ? {...answer, point: 1, isChecked: false, isDisabled: true, endClasses: "green"} :
                    answer.isCorrect ? {...answer, isChecked: false, isDisabled: true, endClasses: "green"} :
                    {...answer, isChecked: false, isDisabled: true, endClasses: "opaque"} 
            })))
            setAreAnswersChecked(true)
        }
    }

    const score = props.allAnswers.map(answers => answers.some(answer => answer.point > 0)).filter(point => point).length

    function setAnswer(e) {
        const value = e.currentTarget.value
        const name = e.currentTarget.name
        
        props.setAllAnswers(prevAllAnswers => prevAllAnswers.map(answers => answers.map(answer => {
            return value === answer.answer ? {...answer, isChecked: true} : 
                    value !== answer.answer && name === answer.qId ? {...answer, isChecked: false} :
                    answer
        })))
    }

    const showQuestions = props.questions.map((question, index) => {
     
        const answers = props.allAnswers.map(answers => answers.filter(answer => answer.qId === question.id).map(answer => { 
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
        )

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
            <div className="check-answers-container">
                {areAnswersChecked && <p>You scored {score}/5 correct answers</p>}
                <button className="check-answers-btn" onClick={checkAnswers}>{areAnswersChecked ? "Play again" : "Check answers"}</button>
            </div>
        </>
    )
}