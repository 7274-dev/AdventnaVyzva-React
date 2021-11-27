import { useEffect, useRef, useState } from 'react';
import useIsMounted from 'ismounted';
import { useTheme } from '../../../App';
import { useParam } from '../../../hooks/useParam';
import {
    BackToHomePageButton,
    Loading,
    MDEditor,
    Modal,
    NotFoundPage,
    ShortInput,
    Attachment
} from '../../../components';
import { Submission } from '.';
import { localized } from '../../../hooks/useLocalization';
import { toast } from 'react-toastify';
import { isDefined } from '../../../hooks/isDefined';
import * as Api from '../../../api';
import EditIconDark from '../../../images/edit-dark.png';
import EditIconLight from '../../../images/edit-light.png';
import TrashcanImageDark from '../../../images/trashcan-dark.png';
import TrashcanImageLight from '../../../images/trashcan-light.png';
import './HomeworkSection.css';

const HomeworkCard = ({ token }) => {
    // TODO code: add due editing
    // files not showing
    // add an option to delete ball after hw creation

    const [data, setData] = useState(undefined);
    const [isModalActive, setIsModalActive] = useState(false);
    const [showBackToHomePageButton, setShowBackToHomePageButton] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const modalTitleRef = useRef();
    const [modalText, setModalText] = useState(null);
    const isMounted = useIsMounted();
    const id = useParam();
    const darkMode = useTheme('').includes('dark');
    const homeworkCardClassName = useTheme('homework-card');
    const submissionsClassName = useTheme('submissions');

    const fetchData = async () => {
        try {
            const response = await Api.homework.fetchHomeworkById(token, id);
            const data = (await response.json()).response;

            if (response.status !== 200) {
                // noinspection ExceptionCaughtLocallyJS
                throw new Error('UserIsAdminError');
            }

            // noinspection JSUnresolvedVariable
            if (isMounted.current) {
                setData(data);
            }
        }
        catch (err) {
            setData(null);
        }
    }

    // noinspection DuplicatedCode
    const fetchAttachments = async () => {
        const response = await Api.homework.getAttachments(token, id);

        if (response.status !== 200) {
            toast.error(localized('toast.getAttachmentError').replace('$ERROR', (await response.json()).error));
            return;
        }

        let attachments = [];
        for (const homeworkAttachment of (await response.json()).response) {
            if (!isDefined(homeworkAttachment?.file?.id)) continue;
            attachments.push(homeworkAttachment);
        }

        // noinspection JSUnresolvedVariable
        if (isMounted.current) {
            setAttachments(attachments);
        }
    }

    const fetchSubmissions = async () => {
        const response = await Api.homework.getAllSubmissions(token, id);

        if (response.status !== 200) {
            toast.error(localized('toast.fetchSubmissionsError').replace('$ERROR', (await response.json()).error));
            return;
        }

        setSubmissions((await response.json()).response);
    }

    const modalCallback = async (exitBool) => {
        setIsModalActive(false);

        if (!exitBool) return;

        // noinspection JSUnresolvedVariable
        const response = await Api.homework.editHomework(token, id, {
            title: modalTitleRef?.current?.value,
            text: modalText,
            classId: data.clazz.id,
            due: `${data.due} 00:00:00`,
            // fromDate example: 2021-11-01T17:49:14.000+00:00
            fromDate: `${data.fromDate.split('T')[0]} ${data.fromDate.split('T')[1].split('.')[0]}`
        });

        if (response.status !== 200) {
            toast.error(localized('cards.editFailed').replace('$ID', id).replace('$ERROR', (await response.json()).error));
        }
        else {
            toast.success(localized('cards.editSuccess'));

            // noinspection ES6MissingAwait
            fetchData();
        }
    }

    const edit = () => {
        setIsModalActive(true);
    }

    const deleteMe = async () => {
        const response = await Api.homework.deleteHomework(token, id);
        if (response.status === 200) {
            toast.success(localized('cards.deletedSuccessful').replace('$ID', id));

            setShowBackToHomePageButton(true);
        }
        else {
            toast.error(localized('cards.deleteFailed').replace('$ID', id).replace('$ERROR', (await response.json()).error));
        }
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
        // noinspection JSIgnoredPromiseFromCall
        fetchAttachments();
        // noinspection JSIgnoredPromiseFromCall
        fetchSubmissions();
    }, [id, token]);

    if (data === undefined) {
        return <Loading />
    }
    if (data === null) {
        return <NotFoundPage />
    }
    // noinspection JSUnresolvedVariable
    return (
        <div>
            <div className={ homeworkCardClassName }>
                <div className='header'>
                    <h1>{ data.id }, { data.clazz.name }</h1>
                    <div className='header-splitter' />
                    <img src={ darkMode ? EditIconDark : EditIconLight } alt={ localized('cards.edit') } title={ localized('cards.edit') } onClick={ edit } className='unselectable' />
                    <img src={ darkMode ? TrashcanImageDark : TrashcanImageLight } alt={ localized('cards.delete') } title={ localized('cards.delete') } onClick={ deleteMe } className='unselectable' />
                </div>

                <div className='data'>
                    <h1>{ data.title }</h1>
                    <h2 dangerouslySetInnerHTML={{__html: data.text}} />
                    <h1>{ data.fromDate.split('T')[0] } -> { data.due }</h1>
                </div>

                <div className='attachments'>
                    { attachments.map((attachmentData, index) => <Attachment key={ index } data={ attachmentData } />) }
                </div>

                { showBackToHomePageButton && <BackToHomePageButton url='/teacher/homework' /> }

                <Modal active={ isModalActive } finishCallback={ modalCallback } additionalClassName='has-md-editor'>
                    <ShortInput inputRef={ modalTitleRef } text={ data.title } round />
                    <MDEditor token={ token } onChange={(md) => setModalText(md)} children={ data.text } />
                </Modal>
            </div>

            { submissions.length > 0 &&
            <div className={submissionsClassName}>
                { submissions.map((submissionData, index) => <Submission key={ index } data={ submissionData } token={ token } />) }
            </div> }
        </div>
    )
}

export { HomeworkCard }
