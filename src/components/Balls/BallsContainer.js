import { useCallback, useState } from 'react';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { Ball } from './Balls';
import './Balls.css';

const BallsContainer = ({ homework, positions }) => {
    const [ballsContainerRef, setBallsContainerRef] = useState(null);  // this needs to be use state for rendering
    const ballsContainerClassName = useResponsiveValue(`balls-container`, `balls-container-mobile`);

    const onRefChange = useCallback((node) => {
        setBallsContainerRef(node);
    }, []);

    if (!positions) {
        return null;
    }
    return (
        <div>
            <div className={ ballsContainerClassName } ref={ onRefChange } />

            { ballsContainerRef && homework.map((data, index) =>
                <Ball key={ index } index={ index } data={ data } positions={ positions.find(pos => pos.id === data.id) } />
            ) }
        </div>
    )
}

export { BallsContainer }
