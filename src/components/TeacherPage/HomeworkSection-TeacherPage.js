import { useState, useEffect } from 'react';
import { useTheme } from '../../App';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import * as Api from '../../Api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/HomeworkSection-TeacherPage.css';

const Homework = ({ id, token }) => {
    // TODO code: check if this works

    const homeworkClassName = useTheme('student');
    const [body, setBody] = useState(<div />);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.makeGetRequest(token, `/api/homework/?homeworkId=${id}`);
                const data = (await response.json()).response;

                setBody(
                    <div className={ homeworkClassName }>
                        <h1>{ id } | { data.title } | { data.text } | { data.fromDate } | { data.dueDate } | { data.classId }</h1>
                    </div>
                );
            }
            catch (err) {}
        }

        fetchData();
    }, [id, homeworkClassName, token]);

    return body;
}

const HomeworkSection = ({ token }) => {
    const orderValues = [
        {
            id: 0,
            value: 'By date - latest'
        },
        {
            id: 1,
            value: 'By date - latest reversed'
        },
        {
            id: 2,
            value: 'By Name - alphabetically'
        },
        {
            id: 3,
            value: 'By Name - alphabetically reversed'
        }
    ]

    const [order, setOrder] = useState(orderValues[0]);
    const [query, setQuery] = useState('');
    const [homework, setHomework] = useState([]);

    useEffect(() => {
        QueryParser.changeOrder(true, token, order, homework, setHomework);
    }, [token, order, homework]);

    useEffect(() => {
        const fetchHomework = async () => {
            if ([undefined, null].includes(query)) {
                return;
            }

            const response = await Api.makeGetRequest(token, `/api/search/homework/any?query=${query}`);
            const body = (await response.json()).response;

            setHomework(body);
        }

        setHomework('');
        fetchHomework().catch(err => setHomework('SomethingWentWrong'));
    }, [token, query]);

    return (
        <div className='homework-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            <div className='homework-container'>
                { homework === '' && <div /> /* this represents loading, leave it empty */ }
                { homework === 'SomethingWentWrong' && <SomethingWentWrong /> }
                { !['', 'SomethingWentWrong'].includes(homework) &&
                    <div>
                        <h1>ID | Title | Text | From date | Due date | Class</h1>
                        { homework.map(id => <Homework id={ id } token={ token } />) }
                    </div>
                }
            </div>
        </div>
    )
}

export { HomeworkSection };
