import { useCallback, useState } from 'react';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { Ball } from './Balls';
import './Balls.css';

const BallsContainer = ({ ballsData }) => {
    const [ballsContainerRef, setBallsContainerRef] = useState(null);  // this needs to be use state for rendering
    const isMobile = useResponsiveValue(false, true, true);
    const ballsContainerClassName = `balls-container${isMobile ? '-mobile' : ''}`;

    const onRefChange = useCallback((node) => {
        setBallsContainerRef(node);
    }, []);

    return (
        <div>
            <div className={ ballsContainerClassName } ref={ onRefChange } />

            { ballsContainerRef && ballsData.map((data, index) =>
                <Ball key={ index } index={ index } data={ data } left={ data.position.left } top={ data.position.top } />
            ) }
        </div>
    )
}

export { BallsContainer }
