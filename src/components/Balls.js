import { useState, useEffect, useRef } from 'react';
import { useDefaultValue } from '../hooks/useDefaultValue';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import '../styles/Balls.css';


const Ball = ({ index, image }) => {
    useEffect(() => {
        if (loadCookie('positions') === undefined) {
            saveCookie('positions', {});
        }
    }, []);

    // we use this because tests don't have cookies environment -> always fail
    // don't remove or refactor
    const getPosition = (position) => {
        let value;
        try {
            value = loadCookie('positions')[position];
        }
        catch (err) {
            value = undefined;
        }
        return value;
    }

    // TODO code, design: add normal spawn position
    // idea: maybe on the right side of the screen?
    const [top, setTop] = useState(useDefaultValue(getPosition(`${index}-top`), 0));
    const [left, setLeft] = useState(useDefaultValue(getPosition(`${index}-left`), 0));
    const divRef = useRef();

    // TODO code: fix can't drag ball on mobile
    // TODO code: make movement smoother
    // TODO code: fix performance
    const moveDiv = e => {
        // idea: add right click = balls will go away from the cursor

        // we only want left clicks (for now)
        if (e.buttons !== 1) {
            return;
        }

        let topOffset = e.clientY - top;
        // so the cursor is in the middle of ball (only horizontal axis)
        let leftOffset = e.clientX - left - divRef.current.clientWidth / 2;

        setTop(top + topOffset);
        setLeft(left + leftOffset);
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
        const positions = loadCookie('positions');
        positions[`${index}-top`] = top;
        positions[`${index}-left`] = left;
        saveCookie('positions', positions);
    }, [top, left, index]);

    return (
        <div className='ball' style={{top: `${top}px`, left: `${left}px`}} ref={ divRef }>
            { image }
        </div>
    )
}


const BallsContainer = ({ children }) => {
    useEffect(() => {
        if (loadCookie('positions') === undefined) {
            saveCookie('positions', {})
        }
    }, []);

    return (
        <div className='balls-container'>
            { children }
        </div>
    )
}

export { BallsContainer, Ball }
