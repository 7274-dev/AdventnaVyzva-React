import { useState, useEffect, useRef } from 'react';
import { useDefaultValue } from '../../hooks/useDefaultValue';
import './Balls.css';

const Ball = ({ index, ballsContainerRef, ballId, children }) => {
    // we use this because tests don't have local storage environment -> always fail
    const getPosition = (position) => {
        try {
            return JSON.parse(localStorage.getItem('positions'))[position];
        }
        catch (err) {
            return undefined;
        }
    }

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

export { Ball }
