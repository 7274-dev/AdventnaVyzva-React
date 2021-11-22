import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { useDrop } from 'react-dnd';
import { BallsContainer } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import { ItemTypes } from '..';
import TreeImage from '../../../images/stromcek.ico';
import './StudentsPage.css';
import {load} from "react-cookies";

const StudentsPage = ({ token }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO code: add completed homework balls drag'n'drop on tree
    // where to put done homework balls?

    const [homework, setHomework] = useState(undefined);
    const [myUserId, setMyUserId] = useState(undefined);
    const studentsPageClassName = useTheme('students-page');
    const treeClassName = useTheme('tree', 'unselectable');

    const fetchMyUserId = async () => {
        const response = await Api.utils.getIdByToken(token);

        if (response.status !== 200) {
            // TODO code: show toast
            return;
        }

        setMyUserId((await response.json()).response);
    }

    const fetchData = async () => {
        if (!myUserId) return;

        const response = await Api.homework.fetchHomeworkByUserId(token, myUserId);

        if (response.status !== 200) {
            return;
        }

        let homework = [];
        for (let hw of (await response.json()).response) {
            const response = await Api.homework.doesHomeworkHaveBall(token, hw.id);

            if (response.status !== 200 || !(await response.json()).response) {
                // what now?
                continue;
            }

            const isDoneResponse = await Api.homework.isDone(token, hw.id, myUserId);

            hw = {
                ...hw,
                isDone: (await isDoneResponse.json())?.response,
                position: {
                    top: 0,
                    left: 0
                }
            };

            homework.push(hw);
        }

        setHomework(homework);
    }

    const loadPositions = () => {
        const positions = JSON.parse(localStorage.getItem('positions') || 'null');
        if (!positions) return;

        const updatedHw = homework.slice();
        for (const position of positions) {
            const hw = homework.find(hw => hw.id === position.id);

            if (!hw) continue;

            updatedHw.position = position;
        }

        console.log(`setting homework to `, updatedHw);
        setHomework(updatedHw);
    }

    const savePositions = () => {
        if (!homework) return;

        let positions = [];

        for (let hw of homework) {
            positions.push({
                id: hw.id,
                top: hw.position.top,
                left: hw.position.left
            });
        }

        console.log(`saving to local storage`, positions, `with homework`, homework);
        alert('updated')
        localStorage.setItem(`positions`, JSON.stringify(positions));
    }

    const moveBox = useCallback((index, left, top) => {
        let updatedHomework = homework.slice();
        updatedHomework[index].position.left = left;
        updatedHomework[index].position.top = top;
        setHomework(updatedHomework);
        savePositions();
    }, [homework, setHomework]);

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

        // loadPositions();
    }, [homework, setHomework]);

    return (
        <div className={ studentsPageClassName }>
            <div className={ treeClassName } ref={ drop }>
                <img draggable={ false } src={ TreeImage } alt={ localized('studentsPage.christmasTree') } title={ localized('studentsPage.christmasTree') } />
            </div>

            <BallsContainer ballsData={ !homework ? [] : homework } />
        </div>
    )
}

export { StudentsPage }
