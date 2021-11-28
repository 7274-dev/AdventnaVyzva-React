import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { useDrop } from 'react-dnd';
import { useResponsiveValue } from '../../../hooks/useResponsiveValue';
import { BallsContainer } from '../../../components';
import { toast } from 'react-toastify';
import { getPxByRem } from '../../../hooks/getPxByRem';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import { ItemTypes } from '..';
import TreeImage from '../../../images/stromcek.ico';
import './StudentsPage.css';

const StudentsPage = ({ token }) => {
    const [homework, setHomework] = useState(undefined);
    const [positions, setPositions] = useState(undefined);
    const [myUserId, setMyUserId] = useState(undefined);
    const studentsPageClassName = useTheme('students-page');
    const treeClassName = useTheme('tree', 'unselectable');
    const isMobile = useResponsiveValue(false, true);

    const fetchMyUserId = async () => {
        const response = await Api.utils.getIdByToken(token);

        if (response.status !== 200) {
            toast.error(localized('error.unexpectedError'));
            return;
        }

        setMyUserId((await response.json()).response);
    }

    const generatePosition = useCallback(() => {
        // don try to understand this function
        // you will have headache after reading this code
        // it just works

        if (!isMobile) {
            return {
                top: getPxByRem(2) + Math.random() * window.innerHeight * .3 - getPxByRem(2.5) * .5,
                left: window.innerWidth - getPxByRem(2) - window.innerWidth * .1 + Math.random() * window.innerWidth * .1 - getPxByRem(3) * .5,
            }
        }

        let ballsContainerWidth = 0;
        let treeHeight = 0;
        // media queries in CSS xd
        if (window.innerWidth > 200) {
            ballsContainerWidth = window.innerWidth * .9;
            treeHeight = window.innerWidth * .9;
        }
        if (window.innerWidth > 400) {
            ballsContainerWidth = window.innerWidth * .8;
            treeHeight = window.innerWidth * .8;
        }
        if (window.innerWidth > 600) {
            ballsContainerWidth = window.innerWidth * .7;
            treeHeight = window.innerWidth * .7;
        }
        if (window.innerWidth > 800) {
            ballsContainerWidth = window.innerWidth * .5;
            treeHeight = window.innerWidth * .5;
        }
        if (window.innerWidth > 1000) {
            ballsContainerWidth = window.innerWidth * .4;
            treeHeight = window.innerWidth * .4;
        }
        if (window.innerWidth > 1400) {
            ballsContainerWidth = window.innerWidth * .3;
            treeHeight = window.innerWidth * .3;
        }

        return {
            top: getPxByRem(.5) + treeHeight + getPxByRem(1) * 3 + Math.random() * getPxByRem(10) - getPxByRem(2.5) * .5,
            left: (window.innerWidth - ballsContainerWidth) / 2 + Math.random() * ballsContainerWidth - getPxByRem(3) * .5,
        }
    }, []);

    const fetchData = async () => {
        if (!myUserId) return;

        const response = await Api.homework.fetchHomeworkByUserId(token, myUserId);

        if (response.status !== 200) {
            return;
        }

        let homework = [];
        let positions = [];
        for (const hw of (await response.json()).response) {
            const response = await Api.homework.doesHomeworkHaveBall(token, hw.id);

            if (response.status !== 200) {
                toast.error(localized('error.unexpectedError'));
                continue;
            }

            const isDoneResponse = await Api.homework.isDone(token, hw.id, myUserId);
            const feedbackResponse = await Api.homework.getFeedbackForSubmission(token, hw.id);

            homework.push({
                ...hw,
                isDone: (await isDoneResponse.json())?.response,
                feedback: (await feedbackResponse.json())?.response,
            });
            const { top, left } = generatePosition();
            positions.push({
                id: hw.id,
                top: top,
                left: left
            });
        }

        setHomework(homework);
        setPositions(positions);
    }

    const loadPositions = () => {
        if (!homework) return;

        const positions = JSON.parse(localStorage.getItem('positions') || 'null');
        if (!positions) return;

        for (const hw of homework) {
            // if position for homework doesn't exist (because homework is new), generate it
            const position = positions.find(pos => pos.id === hw.id);
            if (!position) {
                const { top, left } = generatePosition();
                positions.push({
                    id: hw.id,
                    top: top,
                    left: left,
                });
            }
        }
        for (const position of positions) {
            const hw = homework.find(hw => hw.id === position.id);
            if (!hw) {
                positions.splice(positions.indexOf(position), 1);
            }
        }

        setPositions(positions);
    }

    const savePositions = () => {
        localStorage.setItem(`positions`, JSON.stringify(positions));
    }

    const moveBox = useCallback((id, left, top) => {
        const newPositions = positions.slice();
        const index = newPositions.findIndex((pos) => pos.id === id);
        newPositions[index].top = top;
        newPositions[index].left = left;
        setPositions(newPositions);
    }, [positions, setPositions]);

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.BALL,
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            moveBox(item.id, left, top);
            return undefined;
        },
    }), [moveBox]);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchMyUserId();
    }, []);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, [myUserId, setHomework]);

    useEffect(() => {
        if (!homework) return;

        loadPositions();
    }, [homework, setPositions]);

    useEffect(() => {
        if (!positions) return;

        savePositions();
    }, [positions, setPositions]);

    return (
        <div className={ studentsPageClassName }>
            <div className={ treeClassName } ref={ drop }>
                <img draggable={ false } src={ TreeImage } alt={ localized('studentsPage.christmasTree') } title={ localized('studentsPage.christmasTree') } />
            </div>

            <BallsContainer homework={ homework } positions={ positions } />
        </div>
    )
}

export { StudentsPage }
