import { useState, useEffect } from 'react';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import * as Api from '../../Api';
import { areArraysEqual, sortArrayAlphabetically } from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/HomeworkSection-TeacherPage.css';
import {useTheme} from "../../App";

const Homework = ({ id }) => {
    // TODO code: add backend data fetching

    const homeworkClassName = useTheme('homework');

    return (
        <div className={ homeworkClassName }>
            <h1>{ id } | Title | Text | From Date | Due Date | Class</h1>
            <h2>Some text</h2>
        </div>
    )
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

    // idea: maybe move this whole useEffect body to QueryParser
    useEffect(() => {
        if (['', 'SomethingWentWrong'].includes(homework) || !order) {
            return;
        }

        const sortHomework = async (homework, id) => {
            let sortedHomework = [];

            if (id === 0) {
                sortedHomework = sortArrayAlphabetically(homework);
            }
            else if (id === 1) {
                sortedHomework = sortArrayAlphabetically(homework).reverse();
            }

            return sortedHomework;
        }

        const updateHomework = async () => {
            const sortedHomework = await sortHomework(homework, order.id);

            if (!areArraysEqual(sortedHomework, homework)) {
                setHomework(sortedHomework);
            }
        }

        updateHomework().catch(r => setHomework('SomethingWentWrong'));
    }, [token, order, homework]);

    useEffect(() => {
        const fetchHomework = async () => {
            if ([undefined, null].includes(query)) {
                return;
            }

            // TODO code: fix this url
            const response = await Api.makeGetRequest(token, `/api/search/user?query=${query}`);
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
                { !['', 'SomethingWentWrong'].includes(homework) && homework.map(id => <Homework id={ id } />) }
            </div>
        </div>
    )
}

export { HomeworkSection };
