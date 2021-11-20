import { useState, useEffect } from 'react';
import { useTheme } from '../../../App';
import useIsMounted from 'ismounted';
import { Loading, SomethingWentWrong } from '../../../components';
import { QueryControls } from '../index';
import { redirectMeTo } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import * as QueryParser from '../QueryManager/QueryParser';
import NewImageDark from '../../../images/new-dark.png';
import NewImageLight from '../../../images/new-light.png';
import './HomeworkSection.css';

const Homework = ({ data }) => {
    // noinspection JSUnresolvedVariable
    return (
        <div onClick={() => redirectMeTo(`/teacher/homework/${data.id}`)} className='homework'>
            <h1 className='homework-id'>{ data.id }</h1>
            <h1 className='homework-class'>{ data.clazz.name }</h1>
            <h1 className='homework-title'>{ data.title }</h1>
            <h1 className='homework-text'>...</h1>
            <h1 className='homework-from_date'>{ data.fromDate.split('T')[0] }</h1>
            <h1 className='homework-due'>{ data.due }</h1>
        </div>
    );
}

const HomeworkSection = ({ token }) => {
    const orderValues = [
        {
            id: 0,
            value: localized('dropdown.byTitleAlphabetically')
        },
        {
            id: 1,
            value: localized('dropdown.byTitleAlphabeticallyReversed')
        },
        {
            id: 2,
            value: localized('dropdown.byDate')
        },
        {
            id: 3,
            value: localized('dropdown.byDateReversed')
        }
    ]

    const isMounted = useIsMounted();
    const darkMode = useTheme('').includes('dark');
    const [order, setOrder] = useState(orderValues[0]);
    const [query, setQuery] = useState('');
    const [homework, setHomework] = useState('');
    const [timeoutId, setTimeoutId] = useState(0);

    const fetchHomework = async () => {
        const response = await Api.homework.queryHomeworkByName(token, query);
        const body = (await response.json()).response;

        // noinspection JSUnresolvedVariable
        if (isMounted.current) {
            setHomework(body);
        }
    }

    const createNewHomework = () => {
        redirectMeTo('/teacher/homework/new');
    }

    useEffect(() => {
        QueryParser.changeOrder(true, token, order, homework, setHomework, 'title');
    }, [token, order, homework]);

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setTimeoutId(setTimeout(() => {
            fetchHomework().catch(() => setHomework('SomethingWentWrong'));
        }, 500));
    }, [token, query]);

    useEffect(() => {
        fetchHomework().catch(() => setHomework('SomethingWentWrong'));
    }, []);

    return (
        <div className='homework-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            <div className='homework-container'>
                { homework === '' && <Loading /> /* this represents loading, leave it empty */ }
                { homework === 'SomethingWentWrong' &&
                <div style={{height: '50%'}}>
                    <SomethingWentWrong h1FontSize='2rem' h2FontSize='1.5rem' />
                </div> }

                { !['', 'SomethingWentWrong'].includes(homework) &&
                <div className='homework-table'>
                    <div className='header'>
                        <h1 className='homework-id'>{ localized('teacherPage.id') }</h1>
                        <h1 className='homework-class'>{ localized('teacherPage.class') }</h1>
                        <h1 className='homework-title'>{ localized('teacherPage.title') }</h1>
                        <h1 className='homework-text'>{ localized('teacherPage.text') }</h1>
                        <h1 className='homework-from_date'>{ localized('teacherPage.fromDate') }</h1>
                        <h1 className='homework-due'>{ localized('teacherPage.due') }</h1>
                    </div>
                    { homework.map((data, index) => <Homework key={ index } data={ data } />) }
                </div> }
            </div>

            <img src={ darkMode ? NewImageDark : NewImageLight } alt={ localized('teacherPage.newHomeworkImageAlt') }
                 className='new-homework-button unselectable' onClick={ createNewHomework } title={ localized('teacherPage.newHomeworkImageAlt') } />
        </div>
    )
}

export { HomeworkSection }
