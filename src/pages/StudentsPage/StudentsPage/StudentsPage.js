import { useCallback, useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { useDrop } from 'react-dnd';
import { BallsContainer } from '../../../components';
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

    const [homework, setHomework] = useState([]);
    const [myUserId, setMyUserId] = useState(null);
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

    const moveBox = useCallback((index, left, top) => {
        let updatedHomework = homework.slice();
        updatedHomework[index].position.left = left;
        updatedHomework[index].position.top = top;
        setHomework(updatedHomework);
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
    }, [myUserId]);

    return (
        <div className={ studentsPageClassName }>
            <div className={ treeClassName } ref={ drop }>
                <img draggable={ false } src={ TreeImage } alt={ localized('studentsPage.christmasTree') } title={ localized('studentsPage.christmasTree') } />
            </div>

            <BallsContainer ballsData={ homework } />
        </div>
    )
}

export { StudentsPage }
