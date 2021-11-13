import { useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import {Loading, NotFoundPage} from '../../../components';
import { BackToHomePageButton } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import EditIconDark from '../../../images/edit-dark.png';
import EditIconLight from '../../../images/edit-light.png';
import TrashcanImageDark from '../../../images/trashcan-dark.png';
import TrashcanImageLight from '../../../images/trashcan-light.png';
import './ClassesSection.css';

const ClassCard = ({ token }) => {
    // TODO code: finish me
    const [data, setData] = useState('');
    const [showBackToHomePageButton, setShowBackToHomePageButton] = useState(false);
    const classCardClassName = useTheme('class-card');
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];
    const isDarkMode = useTheme('').includes('dark');

    const fetchData = async () => {
        const response = await Api.clazz.getClassById(token, id);

        if (response.status === 404) {
            setData('NotFound');
            return;
        }
        if (response.status !== 200) {
            toast.error(localized('teacherPage.classCard.fetchFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        setData((await response.json()).response);
    }

    const edit = () => {

    }

    const deleteMe = async () => {
        const response = await Api.clazz.deleteClass(token, id);

        if (response.status !== 200) {
            toast.error(localized('teacherPage.classCard.deleteFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        toast.info(localized('teacherPage.classCard.deleteSuccess'));
        setShowBackToHomePageButton(true);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (data === '') {
        return <Loading />
    }
    else if (data === 'NotFound') {
        return <NotFoundPage />
    }
    return (
        <div className={ classCardClassName }>
            <div className='header'>
                <h1>{ data.id }</h1>
                <div className='header-splitter' />
                <img src={ isDarkMode ? EditIconDark : EditIconLight } alt={ localized('cards.edit') } onClick={ edit } className='unselectable' />
                <img src={ isDarkMode ? TrashcanImageDark : TrashcanImageLight } alt={ localized('cards.delete') } onClick={ deleteMe } className='unselectable' />
            </div>

            <div className='data'>
                <h1>{ data.name }</h1>
            </div>

            { showBackToHomePageButton && <BackToHomePageButton /> }
        </div>
    )
}

export { ClassCard }
