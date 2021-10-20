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

    const [top, setTop] = useState(useDefaultValue(getPosition(`${index}-top`), ballsContainerRef?.getBoundingClientRect().top || 0));
    const [left, setLeft] = useState(useDefaultValue(getPosition(`${index}-left`), ballsContainerRef?.getBoundingClientRect().left || 0));
    const divRef = useRef();
    const either = useDefaultValue;

    // TODO code: fix can't drag ball on mobile
    const moveDiv = (e) => {
        e.preventDefault()

        if (e.button !== 0) {
            return;
        }
        if (e.clientY === 0 || e.clientX === 0) {
            return;
        }

        setTop(e.clientY);
        setLeft(e.clientX - divRef.current.clientWidth / 2);
    }

    const redirectToSubmit = () => {
        redirectMeTo(`/student/homework/${data.id}`, 0, true);
    }

    // saving to local storage
    useEffect(() => {
        const positions = either(JSON.parse(localStorage.getItem('positions')), {});
        positions[`${index}-top`] = top;
        positions[`${index}-left`] = left;
        localStorage.setItem('positions', JSON.stringify(positions));
    }, [top, left, index]);

    return (
        <div className='ball' style={{top: `${top}px`, left: `${left}px`}} ref={ divRef } onDragEnd={ moveDiv } onClick={ redirectToSubmit } draggable>
            <div style={{width: '100%', height: '100%', backgroundColor: 'blue'}} />
        </div>
    )
}

export { Ball }
