import { useCallback, useState } from 'react';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { Ball } from './Balls';
import './Balls.css';

const BallsContainer = ({ ballsData }) => {
    const [ballsContainerRef, setBallsContainerRef] = useState(null);
    const isMobile = useResponsiveValue(false, true, true);
    const ballsContainerClassName = `balls-container${isMobile ? '-mobile' : ''}`;

    const onRefChange = useCallback(node => {
        setBallsContainerRef(node);
    }, []);

    

    return (
        <div>
            <div className={ ballsContainerClassName } ref={ onRefChange } />

            { ballsContainerRef && ballsData.map((data, index) => {
                return <Ball style={!data.isDone && {filter: 'grayscale(70%)'}} key={ index } index={ data.id } ballsContainerRef={ ballsContainerRef } data={ data } />
            }) }
        </div>
    )
}

export { BallsContainer }
