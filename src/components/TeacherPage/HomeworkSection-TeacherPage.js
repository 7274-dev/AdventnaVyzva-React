import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../App';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import useIsMounted from 'ismounted';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import { Modal, ShortInput } from '../Modal';
import { DelayedRedirect } from '../DelayedRedirect';
import * as Api from '../../Api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/HomeworkSection-TeacherPage.css';
import EditIconDark from '../../images/edit-dark.png';
import EditIconLight from '../../images/edit-light.png';

const Homework = ({ data }) => {
    const [redirect, setRedirect] = useState(null);

    const redirectTo = () => {
        setRedirect(<DelayedRedirect to={ `/teacher/homework/${data.id}` } />);
    }

    return (
        <tr onClick={ redirectTo }>
            <td className='homework-id'>{ data.id }</td>
            <td className='homework-class'>{ data.clazz.name }</td>
            <td className='homework-title'>{ data.title }</td>
            <td className='homework-text'>...</td>
            <td className='homework-from_date'>{ data.fromDate.split('T')[0] }</td>
            <td className='homework-due'>{ data.due }</td>

            { redirect }
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

    // TODO code, design: add homework card functionality

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
    const [data, setData] = useState(undefined);
    const [isModalActive, setIsModalActive] = useState(false);
    const isMounted = useIsMounted();
    const homeworkCardClassName = useTheme('homework-card');
    const modalNameRef = useRef();
    const modalUsernameRef = useRef();
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];
    const EditIcon = useTheme('').includes('dark') ? EditIconDark : EditIconLight;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.makeGetRequest(token, `/api/homework/admin?homeworkId=${id}`);
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
                <img src={ EditIcon } alt='Edit' onClick={ edit } className='unselectable' />
            </div>

            <div className='data'>
                <h1>{ data.title }</h1>
                <h2 dangerouslySetInnerHTML={{__html: data.text}} />
                <h1>{ data.fromDate.split('T')[0] }</h1>
                <h1>{ data.due }</h1>

                <br className='unselectable' />
            </div>

            <Modal active={ isModalActive } finishCallback={ modalCallback }>
                <ShortInput ref={ modalNameRef } text={ data.name } />
                <ShortInput ref={ modalUsernameRef } text={ data.username } />
            </Modal>
        </div>
    )
}

export { HomeworkSection, HomeworkCard };
