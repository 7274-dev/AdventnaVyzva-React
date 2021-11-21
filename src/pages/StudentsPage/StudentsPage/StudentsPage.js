import { useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { BallsContainer } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import Tree from '../../../images/stromcek.ico';
import './StudentsPage.css';

const StudentsPage = ({ token }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO code: add completed homework balls drag'n'drop on tree
    // where to put done homework balls?

    const [homework, setHomework] = useState([]);
    const [balls, setBalls] = useState([]);
    const [doneHomework, setDoneHomework] = useState([]);
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

        setHomework((await response.json()).response);
    }

    const fetchHomeworkBalls = async () => {
        if (!myUserId) return;

        setBalls([]);

        let balls = [];
        let doneHomework = [];
        for (const hw of homework) {
            const response = await Api.homework.doesHomeworkHaveBall(token, hw.id);

            if (response.status !== 200 || !(await response.json()).response) {
                // what now?
                continue;
            }

            balls.push(hw.id);

            const isDoneResponse = await Api.homework.isDone(token, hw.id, myUserId);

            if (!(await isDoneResponse.json())?.response || isDoneResponse.status !== 200) {
                continue;
            }

            doneHomework.push(hw.id);
        }

        setBalls(balls);
        setDoneHomework(doneHomework);
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchMyUserId();
    }, []);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, [myUserId]);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchHomeworkBalls();
    }, [homework, myUserId]);

    return (
        <div className={ studentsPageClassName }>
            <div className={ treeClassName }>
                <img draggable={ false } src={ Tree } alt={ localized('studentsPage.christmasTree') } title={ localized('studentsPage.christmasTree') } />
            </div>

            <BallsContainer ballsData={ homework
                .filter(hw => balls.includes(hw.id))
                .map((hw) => ({...hw, isDone: doneHomework.includes(hw.id)})) } />
        </div>
    )
}

export { StudentsPage }
