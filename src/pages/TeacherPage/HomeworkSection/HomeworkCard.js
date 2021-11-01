import { useEffect, useRef, useState } from 'react';
import useIsMounted from 'ismounted';
import { useTheme } from '../../../App';
import { useResponsiveValue } from '../../../hooks/useResponsiveValue';
import { LongInput, Modal, NotFoundPage, redirectMeTo, ShortInput } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import EditIconDark from '../../../images/edit-dark.png';
import EditIconLight from '../../../images/edit-light.png';
import TrashcanImageDark from '../../../images/trashcan-dark.png';
import TrashcanImageLight from '../../../images/trashcan-light.png';

const HomeworkCard = ({ token }) => {
    const [data, setData] = useState(undefined);
    const [isModalActive, setIsModalActive] = useState(false);
    const [showBackToHomePageButton, setShowBackToHomePageButton] = useState(false);
    const modalTitleRef = useRef();
    const modalTextRef = useRef();
    const isMounted = useIsMounted();
    const isMobile = useResponsiveValue(false, true);
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];
    const isDarkMode = useTheme('').includes('dark');
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
            catch (err) {
                setData(null);
            }
        }

        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, [id, token]);

    const modalCallback = async (exitBool) => {
        setIsModalActive(false);

        if (!exitBool) return;

        // TODO backend: fix this mapping
        const response = await Api.homework.editHomework(token, id, {
            title: modalTitleRef.current.innerText,
            text: modalTextRef.current.innerHTML
        });
    }

    const edit = () => {
        setIsModalActive(true);
    }

    const deleteMe = async () => {
        const response = await Api.homework.deleteHomework(token, id);
        if (response.status === 200) {
            toast.info(localized('cards.deletedSuccessful').replace('$ID', id));

            setShowBackToHomePageButton(true);
        }
        else {
            toast.error(localized('cards.deleteFailed').replace('$ID', id).replace('$ERROR', (await response.json()).error));
        }
    }

    if (data === undefined) {
        return null;
    }

    if (data === null) {
        return (
            <NotFoundPage />
        );
    }

    return (
        <div className={ homeworkCardClassName }>
            <div className='header'>
                <h1>{ data.id }, { data.clazz.name }</h1>
                <div className='header-splitter' />
                <img src={ isDarkMode ? EditIconDark : EditIconLight } alt={ localized('cards.edit') } onClick={ edit } className='unselectable' />
                <img src={ isDarkMode ? TrashcanImageDark : TrashcanImageLight } alt={ localized('cards.delete') } onClick={ deleteMe } className='unselectable' />
            </div>

            <div className='data'>
                <h1>{ data.title }</h1>
                <h2 dangerouslySetInnerHTML={{__html: data.text}} />
                <h1>{ data.fromDate.split('T')[0] }</h1>
                <h1>{ data.due }</h1>

                <br />
            </div>

            <div className={ `back-to-home-page-button ${showBackToHomePageButton ? 'active' : ''}` } onClick={() => redirectMeTo('/teacher/homework')}>
                { localized('uhavenopowerhere.backToHomePage') }
            </div>

            {/* TODO code: add MDEditor */}
            <Modal active={ isModalActive } finishCallback={ modalCallback }>
                <ShortInput inputRef={ modalTitleRef } text={ data.title } />
                <LongInput inputRef={ modalTextRef } text={ data.text } />
            </Modal>
        </div>
    )
}

export {
    HomeworkCard
}
