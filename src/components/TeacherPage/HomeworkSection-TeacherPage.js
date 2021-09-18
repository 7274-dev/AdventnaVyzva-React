import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../App';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import useIsMounted from 'ismounted';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from '.';
import { Modal, ShortInput, LongInput } from '../Modal';
import { redirectMeTo } from '../RedirectMeTo';
import * as Api from '../../api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/HomeworkSection-TeacherPage.css';
import EditIconDark from '../../images/edit-dark.png';
import EditIconLight from '../../images/edit-light.png';
import { localized } from '../../hooks/useLocalization';

const Homework = ({ data }) => {
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
    // TODO design: fix overflow

    const orderValues = [
        {
            id: 0,
            value: localized('dropdown.byNameAlphabetically')
        },
        {
            id: 1,
            value: localized('dropdown.byNameAlphabeticallyReversed')
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
    const [order, setOrder] = useState(orderValues[0]);
    const [query, setQuery] = useState('');
    const [homework, setHomework] = useState([]);
    const [timeoutId, setTimeoutId] = useState(0);

    const fetchHomework = async () => {
        const response = await Api.homework.queryHomeworkByName(token, query);
        const body = (await response.json()).response;

        if (isMounted.current) {
            setHomework(body);
        }
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
                { homework === '' && <div /> /* this represents loading, leave it empty */ }
                { homework === 'SomethingWentWrong' && <div style={{height: '50%'}}>
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
                        { homework.map(data => <Homework data={ data } />) }
                    </div> }
            </div>
        </div>
    )
}

const HomeworkCard = ({ token }) => {
    const [data, setData] = useState(undefined);
    const [isModalActive, setIsModalActive] = useState(false);
    const modalTitleRef = useRef();
    const modalTextRef = useRef();
    const isMounted = useIsMounted();
    const isMobile = useResponsiveValue(false, true);
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];
    const EditIcon = useTheme('').includes('dark') ? EditIconDark : EditIconLight;
    const homeworkCardClassName = useTheme('homework-card', isMobile ? 'homework-card-mobile' : '');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.homework.fetchHomeworkById(token, id);
                const data = (await response.json()).response;

                if (response.status !== 200) {
                    throw new Error('UserIsAdminError');
                }

                if (isMounted.current) {
                    setData(data);
                }
            }
            catch (err) {}
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, [id, token]);

    const modalCallback = (exitBool) => {
        setIsModalActive(false);

        if (!exitBool) return;

        // TODO backend: fix this mapping
    }

    const edit = () => {
        setIsModalActive(true);
    }

    if (data === undefined) {
        return null;
    }

    return (
        <div className={ homeworkCardClassName }>
            <div className='header'>
                <h1>{ data.id }, { data.clazz.name }</h1>
                <img src={ EditIcon } alt={ localized('cards.edit') } onClick={ edit } className='unselectable' />
            </div>

            <div className='data'>
                <h1>{ data.title }</h1>
                <h2 dangerouslySetInnerHTML={{__html: data.text}} />
                <h1>{ data.fromDate.split('T')[0] }</h1>
                <h1>{ data.due }</h1>

                <br />
            </div>

            <Modal active={ isModalActive } finishCallback={ modalCallback }>
                <ShortInput ref={ modalTitleRef } text={ data.title } />
                <LongInput ref={ modalTextRef } text={ data.text } />
            </Modal>
        </div>
    )
}

export { HomeworkSection, HomeworkCard };
