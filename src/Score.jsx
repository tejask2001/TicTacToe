import './Score.css'

export default function Score(props){
    console.log(props.yourScore);
    return(
        <div className="score">
            <div className="your_score_div">
                <div className='you_text'>X (YOU)</div>
                <div className='your_score'>{props.yourScore}</div>
            </div>
            <div className="tie_score_div">
                <div className='tie_text'>TIES</div>
                <div className='tie_score'>0</div>
            </div>
            <div className="cpu_score_div">
                <div className='cpu_text'>O (CPU)</div>
                <div className='cpu_score'>0</div>
            </div>
        </div>
    )
}