import { useState, useEffect } from 'react';
import { useTheme } from '../../../App';
import { useParam } from '../../../hooks/useParam';
import { useResponsiveValue } from '../../../hooks/useResponsiveValue';
import useIsMounted from 'ismounted';
import { GoogleInput, Loading, Attachment } from '../../../components';
import { BackToHomePageButton } from '../../../components';
import { toast } from 'react-toastify';
import { localized } from '../../../hooks/useLocalization';
import { isDefined } from '../../../hooks/isDefined';
import * as Api from '../../../api';
import './Homework.css';

const Homework = ({ token }) => {
    const [data, setData] = useState(undefined);
    const [attachments, setAttachments] = useState([]);
    const isMounted = useIsMounted();
    const id = useParam();
    const homeworkClassName = useTheme('homework');
    const formClassName = useTheme('form');
    const isMobile = useResponsiveValue(false, true);

    const [messageToTeacher, setMessageToTeacher] = useState('');
    const [files, setFiles] = useState(undefined);

    const fetchData = async () => {
        const response = await Api.homework.fetchHomeworkById(token, id);

        if (response.status !== 200) {
            return;
        }

        // noinspection JSUnresolvedVariable
        if (isMounted.current) {
            setData((await response.json()).response);
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

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
        // noinspection JSIgnoredPromiseFromCall
        fetchAttachments();
    }, [id, token]);

    const submitHomework = async (e) => {
        e.preventDefault();

        let fileIds = [];

        if (files) {
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);
    
                const response = await Api.file.uploadFile(token, formData)
                if (response.status === 200) {
                    fileIds.push((await response.json()).response.id)
                }
                else {
                    toast.error(`${localized('toast.uploadFileError')} ${file.name}`);
                }
            }
        }

        const response = await Api.homework.submitHomework(token, messageToTeacher, fileIds, id);

        if (response.status !== 200 && response.status !== 415) { // if we get 415 it's ok // oh is it?
            toast.error(localized('toast.submitHomeworkError'));
            return;
        }

        toast.success(localized('toast.submitHomeworkSuccessful'));
    }

    if (data === undefined) {
        return <Loading />
    }
    // noinspection JSUnresolvedVariable
    return (
        <div className='homework-page'>
            <div className={ homeworkClassName }>
                <div className='header'>
                    <h1>{ data.id }, { data.clazz.name }</h1>
                </div>

                <div className='data'>
                    <h1>{ data.title }</h1>
                    <div className='text' dangerouslySetInnerHTML={{__html: data.text}} />
                    <h1 className='date'>{ localized('teacherPage.fromDate') } { data.fromDate.split('T')[0] }</h1>
                    <h1 className='date'>{ localized('teacherPage.due') } { data.due }</h1>

                    <br />
                </div>

                <div className='attachments'>
                    { attachments.map((attachmentData, index) => <Attachment key={ index } token={ token } data={ attachmentData } />) }
                </div>
            </div>

            <form className={ formClassName } onSubmit={ submitHomework }>
                <div className='google-input-container'>
                    <GoogleInput placeholder={ localized('studentsPage.messageForTeacher') } onChange={ setMessageToTeacher } />
                </div>
                <input type='file' name='image' multiple className='form-child' onChange={(e) => setFiles(e.target.files)} />
                <button type='submit' className='form-child'>Submit</button>
            </form>

            <BackToHomePageButton url='/student' positionRelative={ isMobile } />
        </div>
    )
}

export { Homework }
