import { useState, useEffect, useRef } from 'react';
import { useDefaultValue } from '../../hooks/useDefaultValue';
import { redirectMeTo } from '../RedirectMeTo';
import './Balls.css';

const Ball = ({ index, ballsContainerRef, data }) => {
    // FIXME https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_ondrag_html

    // we use this because tests don't have local storage environment -> always fail
    const getPosition = (position) => {
        try {
            return JSON.parse(localStorage.getItem('positions'))[position];
        }
        catch (err) {
            return undefined;
        }
    }

    // const [rendered, setRendered] = useState(false);
    const [top, setTop] = useState(useDefaultValue(getPosition(`${index}-top`), ballsContainerRef?.getBoundingClientRect().top || 0));
    const [left, setLeft] = useState(useDefaultValue(getPosition(`${index}-left`), ballsContainerRef?.getBoundingClientRect().left || 0));
    const divRef = useRef();
    const either = useDefaultValue;

    // TODO code: fix can't drag ball on mobile
    const moveDiv = (e) => {
        e.preventDefault()

        console.log(e)

        if (e.button !== 0) {
            return;
        }

        console.log(e.clientY, e.clientX - divRef.current.clientWidth / 2)

        setTop(e.clientY);
        setLeft(e.clientX - divRef.current.clientWidth / 2);
    }

    const redirectToSubmit = () => {
        redirectMeTo(`/student/homework/${data.id}`, 0, true);
    }

    // useEffect(() => {
    //     setRendered(true);
    // }, [top, left])
    //
    // useEffect(() => {
    //     console.log(`changed rendered to`, rendered)
    // }, [rendered])

    // useEffect(() => {
    //     divRef.current.addEventListener('mousedown', () => {
    //         setRendered(false);
    //
    //         console.log(`on`, rendered)
    //
    //         window.addEventListener('mousemove', moveDiv, true);
    //     }, false);
    //     divRef.current.addEventListener('mouseup', () => {
    //         console.log(`off`, rendered)
    //
    //         window.removeEventListener('mousemove', moveDiv, true);
    //
    //         if (!rendered) {
    //             console.log(`FUUUUCK`)
    //             // redirectMeTo(`/student/homework/${data.id}`, 0, true);
    //         }
    //     }, false);
    // }, []);

    // saving to local storage
    useEffect(() => {
        const positions = either(JSON.parse(localStorage.getItem('positions')), {});
        positions[`${index}-top`] = top;
        positions[`${index}-left`] = left;
        localStorage.setItem('positions', JSON.stringify(positions));
    }, [top, left, index]);

    return (
        <div className='ball' style={{top: `${top}px`, left: `${left}px`}} ref={ divRef } onDrag={ moveDiv } onClick={ redirectToSubmit } draggable>
            <div style={{width: '100%', height: '100%', backgroundColor: 'blue'}} />
        </div>
    )
}

export { Ball }
