import React, { useState, useRef } from 'react'


const Scorebtn = ({ status }) => {
    const [isScoreBtnActive, setIsScoreBtnActive] = useState('update score')
    const buttonRef = useRef();

    const updateScore = () => {
        // if (status) {
            setIsScoreBtnActive('updating..')
            setTimeout(() => { buttonRef.current.disabled = true; setIsScoreBtnActive('updated') }, 2000)
            setTimeout(() => { buttonRef.current.disabled = false; setIsScoreBtnActive('update score') }, 3000)
        // }
    }

    return (
        <button
            ref={buttonRef}
            type="submit"
            className={`score-btn ${isScoreBtnActive === 'update score' ? 'score-waiting' : 'score-success'}`}
            onClick={updateScore}
        >
            {isScoreBtnActive}
        </button>
    )
}

export default Scorebtn