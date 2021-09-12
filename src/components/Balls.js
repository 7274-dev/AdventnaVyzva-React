import { useState, useEffect, useRef } from 'react';
import { useDefaultValue } from '../hooks/useDefaultValue';
import '../styles/Balls.css';
import {useResponsiveValue} from "../hooks/useResponsiveValue";

const Ball = ({ index, image }) => {
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
    const [top, setTop] = useState(useDefaultValue(getPosition(`${index}-top`), 0));
    const [left, setLeft] = useState(useDefaultValue(getPosition(`${index}-left`), 0));
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
            { image }
        </div>
    )
}

const BallsContainer = ({ children }) => {
    const isMobile = useResponsiveValue(false, true, true);
    const ballsContainerClassName = `balls-container${isMobile ? '-mobile' : ''}`;

    return (
        <div className={ ballsContainerClassName }>
            { children }
        </div>
    )
}

export { BallsContainer, Ball };
