import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { Ball } from './Balls';
import './Balls.css';

const BallsContainer = ({ homework, positions, dropRef }) => {
    const ballsContainerClassName = useResponsiveValue(`balls-container`, `balls-container-mobile`);

    if (!positions || !homework) {
        return null;
    }
    return (
        <div>
            <div className={ ballsContainerClassName } />

            { homework.map((data, index) =>
                <Ball key={ index } index={ index } data={ data } positions={ positions.find(pos => pos.id === data.id) } />
            ) }
        </div>
    )
}

export { BallsContainer }
