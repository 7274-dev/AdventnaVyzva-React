import { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { redirectMeTo } from '../RedirectMeTo';
import { localized } from '../../hooks/useLocalization';
import { ItemTypes } from '../../pages/StudentsPage';
import BlueBallImage from '../../images/ball-blue.png';
import OrangeBallImage from '../../images/ball-orange.png';
import OrangeRedBallImage from '../../images/ball-orange_red.png';
import PinkBallImage from '../../images/ball-pink.png';
import PurpleBallImage from '../../images/ball-purple.png';
import RedBallImage from '../../images/ball-red.png';
import WhiteBallImage from '../../images/ball-white.png';
import YellowBallImage from '../../images/ball-yellow.png';
import './Balls.css';

const Ball = ({ index, data, top, left }) => {
    // FIXME drag not working on firefox

    const [image, setImage] = useState(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BALl,
        item: { index, left, top },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [index, left, top]);

    // TODO code: fix can't drag ball on mobile

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

    if (isDragging) {
        return <div ref={ drag } />;
    }
    return (
        <div className={ `ball ${!data.isDone ? 'not-done' : ''}` } style={{top, left}} ref={ drag } onClick={ redirectToSubmit }>
            <img src={ image } alt={ localized('studentsPage.ballAlt') } title={ localized('studentsPage.ballAlt') } />
        </div>
    )
}

export { Ball }
