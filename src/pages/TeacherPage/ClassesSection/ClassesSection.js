import { useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { Loading, redirectMeTo } from '../../../components';
import { QueryControls } from '../QueryManager';
import { localized } from '../../../hooks/useLocalization';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import * as QueryParser from '../QueryManager/QueryParser';
import NewImageDark from '../../../images/new-dark.png';
import NewImageLight from '../../../images/new-light.png';
import './ClassesSection.css';

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

    const [data, setData] = useState(null);
    const [order, setOrder] = useState(orderValues[0]);
    const [query, setQuery] = useState('');  // TODO code: implement query
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

    if (!data) {
        return <Loading />
    }
    return (
        <div>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            { console.log(data) }

            <img src={ isDarkMode ? NewImageDark : NewImageLight } alt={ localized('teacherPage.newClassImageAlt') }
                 className='new-class-button unselectable' onClick={ createNewClass } title={ localized('teacherPage.newClassImageAlt') } />
        </div>
    )
}

export { ClassesSection }
