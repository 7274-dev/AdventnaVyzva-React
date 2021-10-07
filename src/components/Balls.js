import { useState, useEffect, useRef, useCallback } from 'react';
import { useDefaultValue } from '../hooks/useDefaultValue';
import { useResponsiveValue } from '../hooks/useResponsiveValue';
import '../styles/Balls.css';

// TODO code: rework this using react DnD (https://react-dnd.github.io/react-dnd/docs/overview)

const Ball = ({ index, ballsContainerRef, children }) => {
    // we use this because tests don't have local storage environment -> always fail
    const getPosition = (position) => {
        try {
            return JSON.parse(localStorage.getItem('positions'))[position];
        }
        catch (err) {
            return undefined;
        }
    }

    // TODO code, design: add normal spawn position
    // Q: where will the balls spawn?
    const [top, setTop] = useState(useDefaultValue(getPosition(`${index}-top`), ballsContainerRef?.getBoundingClientRect().top || 0));
    const [left, setLeft] = useState(useDefaultValue(getPosition(`${index}-left`), ballsContainerRef?.getBoundingClientRect().left || 0));
    const divRef = useRef();
    const either = useDefaultValue;

    // TODO code: fix can't drag ball on mobile
    const moveDiv = e => {
        if (e.buttons !== 1) {
            return;
        }

        setTop(e.clientY);
        setLeft(e.clientX - divRef.current.clientWidth / 2);
    }

    useEffect(() => {
        divRef.current.addEventListener('mousedown', () => {
            window.addEventListener('mousemove', moveDiv, true);
        }, false);
        window.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', moveDiv, true);
        }, false);
    }, []);

    useEffect(() => {
        const positions = either(JSON.parse(localStorage.getItem('positions')), {});
        positions[`${index}-top`] = top;
        positions[`${index}-left`] = left;
        localStorage.setItem('positions', JSON.stringify(positions));
    }, [top, left, index]);

    return (
        <div className='ball' style={{top: `${top}px`, left: `${left}px`}} ref={ divRef }>
            { children }
        </div>
    )
}

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
                    <Ball key={ ballId } index={ ballId } ballsContainerRef={ ballsContainerRef }>
                        { children }
                    </Ball>
                );
            }) }
        </div>
    )
}

export { BallsContainer };
