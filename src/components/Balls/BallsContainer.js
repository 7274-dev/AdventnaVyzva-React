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

            { ballsContainerRef && Object.keys(ballsData).map((ballId) => {
                const { children } = ballsData[ballId];

                return (
                    <Ball key={ ballId } index={ ballId } ballId={ ballId } ballsContainerRef={ ballsContainerRef }>
                        { children }
                    </Ball>
                );
            }) }
        </div>
    )
}

export { BallsContainer }
