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

    // TODO code: add completed homework balls drag'n'drop on tree (with save in cookies)

    const [homework, setHomework] = useState(undefined);
    const studentsPageClassName = useTheme('students-page');
    const treeClassName = useTheme('tree', 'unselectable');

    useEffect(() => {
        const fetchData = async () => {
            const response = await Api.homework.fetchHomeworkByUserId(token, (await (await Api.utils.getIdByToken(token)).json()).response);

            if (response.status !== 200) {
                console.log(`didnt work`, await response.json())
                return;
            }

            console.log(response)
            setHomework((await response.json()).response);
        }
    }, [token]);

    return (
        <div className={ studentsPageClassName }>
            <div className={ treeClassName }>
                <img draggable={ false } src={ Tree } alt={ localized('studentsPage.christmasTree') } />
            </div>

            <BallsContainer ballsData={[
                {
                    id: 5,
                    due: '2069-08-23',
                    fromDate: '2021-08-23 03:01:01.000000',
                    text: 'In this homework, you have to print this europe map and draw a road you would want to try out, and remember all the countries it\'s crossing.',
                    title: 'Road around the europe',
                    clazzId: 2
            }
            ]} />
        </div>
    )
}

export { StudentsPage }
