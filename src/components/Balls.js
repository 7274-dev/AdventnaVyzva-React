import { useState, useEffect, useRef } from 'react';
import { useDefaultValue } from '../hooks/useDefaultValue';
import { load as loadCookie, save as saveCookie } from 'react-cookies';
import '../styles/Balls.css';


const Ball = ({ index, image }) => {
    // TODO code, design: add normal spawn position
    const [top, setTop] = useState(
        useDefaultValue(loadCookie('positions')[`${index}-top`], '0px'));
    const [left, setLeft] = useState(
        useDefaultValue(loadCookie('positions')[`${index}-left`], '0px'));
    const divRef = useRef();

    // TODO code: finish drag'n'drop
    // idea: store positions in cookies

    // TODO code: make movement smooth
    const moveDiv = (e) => {
        if (e.buttons !== 1) {
            return;
        }

        setTop(`${e.clientY}px`);
        setLeft(`${e.clientX - divRef.current.clientWidth / 2}px`);
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
        <div className='ball' style={{top: top, left: left}} ref={ divRef }>
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
