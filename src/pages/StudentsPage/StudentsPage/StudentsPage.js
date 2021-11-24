import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { useDrop } from 'react-dnd';
import { BallsContainer } from '../../../components';
import { toast } from 'react-toastify';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import { ItemTypes } from '..';
import TreeImage from '../../../images/stromcek.ico';
import './StudentsPage.css';

const StudentsPage = ({ token }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO code: add completed homework balls drag'n'drop on tree
    // where to put done homework balls?

    const [ballsContainerRef, setBallsContainerRef] = useState(null);  // this needs to be use state for rendering
    const [homework, setHomework] = useState(undefined);
    const [positions, setPositions] = useState(undefined);
    const [myUserId, setMyUserId] = useState(undefined);
    const studentsPageClassName = useTheme('students-page');
    const treeClassName = useTheme('tree', 'unselectable');

    const fetchMyUserId = async () => {
        const response = await Api.utils.getIdByToken(token);

        if (response.status !== 200) {
            toast.error(localized('error.unexpectedError'));
            return;
        }

        setMyUserId((await response.json()).response);
    }

    const generatePosition = useCallback(() => {
        if (!ballsContainerRef?.current) {
            return { top: 0, left: 0 };
        }

        // FIXME
        console.log(ballsContainerRef.current.getBoundingClientRect());
        return {
            top: ballsContainerRef.current.getBoundingClientRect().top + Math.random() * ballsContainerRef.current.offsetHeight,
            left: ballsContainerRef.current.getBoundingClientRect().left + Math.random() * ballsContainerRef.current.offsetWidth,
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

            if (response.status !== 200 || !(await response.json()).response) {
                toast.error(localized('error.unexpectedError'));
                continue;
            }

            const isDoneResponse = await Api.homework.isDone(token, hw.id, myUserId);

            homework.push({
                ...hw,
                isDone: (await isDoneResponse.json())?.response
            });
            positions.push({
                id: hw.id,
                // we don't need to initialize positions here cuz we will do it in loadPositions()
                top: 0,
                left: 0
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

    const moveBox = useCallback((index, left, top) => {
        const newPositions = [...positions];
        newPositions[index].top = top;
        newPositions[index].left = left;
        setPositions(newPositions);
    }, [positions, setPositions]);

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.BALl,
        drop(item, monitor) {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(item.left + delta.x);
            const top = Math.round(item.top + delta.y);
            moveBox(item.index, left, top);
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

            <BallsContainer homework={ !homework ? [] : homework } positions={ positions }
                            ballsContainerRef={ ballsContainerRef } setBallsContainerRef={ setBallsContainerRef } />
        </div>
    )
}

export { StudentsPage }
