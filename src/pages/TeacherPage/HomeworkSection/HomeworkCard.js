import { useEffect, useRef, useState } from 'react';
import useIsMounted from 'ismounted';
import { useTheme } from '../../../App';
import { useResponsiveValue } from '../../../hooks/useResponsiveValue';
import { LongInput, Modal, ShortInput } from '../../../components';
import EditIconDark from '../../../images/edit-dark.png';
import EditIconLight from '../../../images/edit-light.png';
import * as Api from '../../../api';
import { localized } from '../../../hooks/useLocalization';

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

export {
    HomeworkCard
}
