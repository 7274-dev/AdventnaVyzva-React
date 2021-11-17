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
    const studentsPageClassName = useTheme('students-page');
    const treeClassName = useTheme('tree', 'unselectable');
    const [balls, setBalls] = useState([]);
    const [doneHomework, setDoneHomework] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const myUserId = (await (await Api.utils.getIdByToken(token)).json()).response;
            const response = await Api.homework.fetchHomeworkByUserId(token, myUserId);

            if (response.status !== 200) {
                console.log(`didnt work`, await response.json())
                return;
            }

            setHomework((await response.json()).response);
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, []);

    useEffect(() => {
        const fetchHomeworkBalls = async () => {
            setBalls([]);

            const myUserId = (await (await Api.utils.getIdByToken(token)).json()).response;
            for (const hw of homework) {
                const response = await Api.homework.doesHomeworkHaveBall(token, hw.id);

                if ((await response.json()).response) {
                    setBalls([...balls, hw.id]);

                    const isDone = (await (await Api.homework.isDone(token, hw.id, myUserId)).json()).response;
                    
                    if (isDone) {
                        setDoneHomework([...doneHomework, hw.id]);
                    } 
                }
            }
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchHomeworkBalls();
    }, [homework]);

    return (
        <div className={ studentsPageClassName }>
            <div className={ treeClassName }>
                <img draggable={ false } src={ Tree } alt={ localized('studentsPage.christmasTree') } title={ localized('studentsPage.christmasTree') } />
            </div>

            <BallsContainer ballsData={ homework.filter(hw => balls.includes(hw.id)).map((hw) => ({...hw, isDone: doneHomework.includes(hw.id)})) } />
        </div>
    )
}

export { StudentsPage }
