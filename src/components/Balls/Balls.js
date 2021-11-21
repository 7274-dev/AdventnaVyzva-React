import { useState, useEffect, useRef } from 'react';
import { useDefaultValue } from '../../hooks/useDefaultValue';
import { redirectMeTo } from '../RedirectMeTo';
import { localized } from '../../hooks/useLocalization';
import BlueBallImage from '../../images/ball-blue.png';
import OrangeBallImage from '../../images/ball-orange.png';
import OrangeRedBallImage from '../../images/ball-orange_red.png';
import PinkBallImage from '../../images/ball-pink.png';
import PurpleBallImage from '../../images/ball-purple.png';
import RedBallImage from '../../images/ball-red.png';
import WhiteBallImage from '../../images/ball-white.png';
import YellowBallImage from '../../images/ball-yellow.png';
import './Balls.css';

const Ball = ({ index, ballsContainerRef, data }) => {
    // FIXME drag not working on firefox

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
    const [image, setImage] = useState(null);
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

        // noinspection JSUnresolvedVariable
        setTop(e.clientY - divRef.current.clientHeight / 2);
        // noinspection JSUnresolvedVariable
        setLeft(e.clientX - divRef.current.clientWidth / 2);
    }

    const redirectToSubmit = () => {
        redirectMeTo(`/student/homework/${data.id}`, 0, true);
    }

    useEffect(() => {
        switch (index % 8) {
            case 0:
                return setImage(BlueBallImage);
            case 1:
                return setImage(OrangeBallImage);
            case 2:
                return setImage(OrangeRedBallImage);
            case 3:
                return setImage(PinkBallImage);
            case 4:
                return setImage(PurpleBallImage);
            case 5:
                return setImage(RedBallImage);
            case 6:
                return setImage(WhiteBallImage);
            case 7:
                return setImage(YellowBallImage);
        }
    }, []);

    // saving to local storage
    useEffect(() => {
        const positions = either(JSON.parse(localStorage.getItem('positions')), {});
        positions[`${index}-top`] = top;
        positions[`${index}-left`] = left;
        localStorage.setItem('positions', JSON.stringify(positions));
    }, [top, left, index]);

    return (
        <div className={ `ball ${!data.isDone ? 'not-done' : ''}` } style={{top: `${top}px`, left: `${left}px`}} ref={ divRef } onDragEnd={ moveDiv } onClick={ redirectToSubmit } draggable>
            <img src={ image } alt={ localized('studentsPage.ballAlt') } title={ localized('studentsPage.ballAlt') } />
        </div>
    )
}

export { Ball }
