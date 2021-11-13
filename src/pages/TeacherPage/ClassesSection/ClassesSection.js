import { useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { Loading, redirectMeTo, SomethingWentWrong } from '../../../components';
import { QueryControls } from '../QueryManager';
import { isDefined } from '../../../hooks/isDefined';
import { localized } from '../../../hooks/useLocalization';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import * as QueryParser from '../QueryManager/QueryParser';
import NewImageDark from '../../../images/new-dark.png';
import NewImageLight from '../../../images/new-light.png';
import './ClassesSection.css';

const Clazz = ({ data, query }) => {
    if (!data.name.includes(query) && isDefined(query)) {
        return null;
    }
    return (
        <div onClick={() => redirectMeTo(`/teacher/classes/${data.id}`)} className='class'>
            <h1 className='class-id'>{ data.id }</h1>
            <h1 className='class-name'>{ data.name }</h1>
        </div>
    )
}

const ClassesSection = ({ token }) => {
    // TODO code: finish me

    const orderValues = [
        {
            id: 0,
            value: localized('dropdown.byNameAlphabetically')
        },
        {
            id: 1,
            value: localized('dropdown.byNameAlphabeticallyReversed')
        }
    ]

    const [data, setData] = useState('');
    const [order, setOrder] = useState(orderValues[0]);
    const [query, setQuery] = useState('');
    const isDarkMode = useTheme('').includes('dark');

    const fetchData = async () => {
        const response = await Api.clazz.getAllClasses(token);
        
        if (response.status !== 200) {
            toast.error(localized('teacherPage.classesSection.fetchFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        setData((await response.json()).response);
    }

    const createNewClass = () => {
        redirectMeTo('/teacher/classes/new');
    }

    useEffect(() => {
        QueryParser.changeOrder(false, token, order, data, setData, 'name');
    }, [token, order, data]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='classes-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            { data === '' && <Loading /> }
            { data === 'SomethingWentWrong' &&
            <div style={{height: '50%'}}>
                <SomethingWentWrong h1FontSize='2rem' h2FontSize='1.5rem' />
            </div>  }

            { !['', 'SomethingWentWrong'].includes(data) &&
            <div className='classes-table'>
                <div className='header'>
                    <h1 className='class-id'>{ localized('teacherPage.id') }</h1>
                    <h1 className='class-name'>{ localized('teacherPage.name') }</h1>
                </div>
                { data.map((data) => <Clazz data={ data } query={ query } />) }
            </div>  }

            { console.log(data) }

            <img src={ isDarkMode ? NewImageDark : NewImageLight } alt={ localized('teacherPage.newClassImageAlt') }
                 className='new-class-button unselectable' onClick={ createNewClass } title={ localized('teacherPage.newClassImageAlt') } />
        </div>
    )
}

export { ClassesSection }
