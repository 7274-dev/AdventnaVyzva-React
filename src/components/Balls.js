import '../styles/Balls.css';


const Ball = () => {
    // TODO code: drag'n'drop
    // idea: store positions in cookies

    return (
        <div>

        </div>
    )
}


const BallsContainer = ({ children }) => {
    return (
        <div className='balls-container'>
            { children }
        </div>
    )
}

export { BallsContainer, Ball }
