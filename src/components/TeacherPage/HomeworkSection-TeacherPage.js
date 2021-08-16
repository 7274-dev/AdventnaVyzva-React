import { useState, useEffect } from 'react';
import useIsMounted from 'ismounted';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import * as Api from '../../Api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/HomeworkSection-TeacherPage.css';

const Homework = ({ data }) => {
    // TODO code: fix fromDate formatting

    return (
        <tr>
            <td className='homework-id'>{ data.id }</td>
            <td className='homework-class'>{ data.clazz.name }</td>
            <td className='homework-title'>{ data.title }</td>
            <td className='homework-text'>...</td>
            <td className='homework-from_date'>{ data.fromDate }</td>
            <td className='homework-due'>{ data.due }</td>
        </tr>
    );
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

    const isMounted = useIsMounted();
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

            if (isMounted.current) {
                setHomework(body);
            }
        }

        setHomework('');
        fetchHomework().catch(err => setHomework('SomethingWentWrong'));
    }, [token, query]);

    return (
        <div className='homework-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            <div className='homework-container'>
                { homework === '' && <div /> /* this represents loading, leave it empty */ }
                { homework === 'SomethingWentWrong' && <div style={{height: '50%'}}>
                    <SomethingWentWrong h1FontSize='2rem' h2FontSize='1.5rem' />
                </div> }
                { !['', 'SomethingWentWrong'].includes(homework) &&
                    <table className='homework-table'>
                        <tr>
                            <th className='homework-id'>Id</th>
                            <th className='homework-class'>Class</th>
                            <th className='homework-title'>Title</th>
                            <th className='homework-text'>Text</th>
                            <th className='homework-from_date'>From date</th>
                            <th className='homework-due'>Due</th>
                        </tr>
                        { homework.map(data => <Homework data={ data } />) }
                    </table>
                }
            </div>
        </div>
    )
}

const HomeworkCard = ({ token }) => {

}

export { HomeworkSection, HomeworkCard };
