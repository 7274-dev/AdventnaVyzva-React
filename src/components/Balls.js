import { useState, useEffect, useRef } from 'react';
import { useDefaultValue } from '../hooks/useDefaultValue';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import '../styles/Balls.css';

const Ball = ({ index, image }) => {
    useEffect(() => {
        if (loadCookie('positions') === undefined) {
            saveCookie('positions', {}, {path: '/'});
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
        const positions = loadCookie('positions');
        positions[`${index}-top`] = top;
        positions[`${index}-left`] = left;
        saveCookie('positions', positions, {path: '/'});
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
            saveCookie('positions', {}, {path: '/'})
        }
    }, []);

    return (
        <div className='balls-container'>
            { children }
        </div>
    )
}

export { BallsContainer, Ball }
