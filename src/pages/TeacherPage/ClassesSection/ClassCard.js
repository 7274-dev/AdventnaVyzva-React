import { useEffect, useState } from 'react';
import { Loading } from '../../../components';
import * as Api from '../../../api';
import { localized } from '../../../hooks/useLocalization';
import { toast } from 'react-toastify';
import './ClassesSection.css';

const ClassCard = ({ token }) => {
    // TODO code: finish me
    const [data, setData] = useState(null);
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];

    const fetchData = async () => {
        const response = await Api.clazz.getClassById(token, id);

        if (response.status !== 200) {
            toast.error(localized('teacherPage.classCard.fetchFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        setData((await response.json()).response);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) {
        return <Loading />
    }
    return (
        <div>
            Hey!
        </div>
    )
}

export { ClassCard }
