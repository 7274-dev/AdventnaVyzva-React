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
    const ballFearDistance = 50;

    // TODO code: fix can't drag ball on mobile
    // TODO code: make movement smoother
    const moveDiv = e => {
        console.log(e.buttons)

        if (e.buttons === 1) {
            setTop(e.clientY);
            setLeft(e.clientX - divRef.current.clientWidth / 2);
        }
        else if (e.buttons === 4) {
            // TODO code: finish this easter egg
            // easter egg idea: add right click = balls will go away from the cursor

            if (Math.abs(e.clientY - parseInt(divRef.current.style.top.replace('px', ''))) < ballFearDistance ||
                Math.abs(e.clientX - divRef.current.clientWidth / 2 - parseInt(divRef.current.style.left.replace('px', ''))) < ballFearDistance) {
                setTop(e.clientY - ballFearDistance);
                setLeft(e.clientX - divRef.current.clientWidth / 2 - ballFearDistance);
            }
        }
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
