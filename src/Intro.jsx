export default function Intro(props) {

    return (
        <div className="intro-container">
            <h1>Quizzical</h1>
            <p>The fun trivia game</p>
            <button onClick={props.getQuestions}>Start quiz</button>
        </div>
    )
}