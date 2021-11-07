import { useState, useEffect } from 'react';
import { useTheme } from '../../../App';
import useIsMounted from 'ismounted';
import { GoogleInput } from '../../../components';
import { Attachment } from '.';
import * as Api from '../../../api';
import { toast } from 'react-toastify';
import { localized } from '../../../hooks/useLocalization';
import './Homework.css';

const Homework = ({ token }) => {
    // TODO code: finish me
    // submitting, fetching files

    const [data, setData] = useState(undefined);
    const [attachments, setAttachments] = useState([]);
    const isMounted = useIsMounted();
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];
    const homeworkClassName = useTheme('homework');
    const formClassName = useTheme('form');

    const [messageToTeacher, setMessageToTeacher] = useState('');
    const [files, setFiles] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.homework.fetchHomeworkById(token, id);

                if (response.status !== 200) {
                    return;
                }

                if (isMounted.current) {
                    setData((await response.json()).response);
                }
            }
            catch (err) {}
        }

        // TODO code: remove console.log
        const fetchAttachments = async () => {
            const response = await Api.homework.getAttachments(token, id);

            if (response.status !== 200) {
                console.log((await response.json()).error)
                toast.error(localized('toast.getAttachmentError'));
                return;
            }

            const data = (await response.json()).response;

            let attachments = [];
            for (const homeworkAttachment of data) {
                try {
                    const homeworkAttachmentResponse = await Api.file.downloadFile(token, homeworkAttachment.file.id);

                    if (homeworkAttachmentResponse.status !== 200) {
                        toast.error(localized('toast.getAttachmentError'));
                        continue;
                    }

                    attachments.push(await homeworkAttachmentResponse.text());
                }
                catch (err) {
                    console.log(err)
                    toast.error(localized('toast.getAttachmentError'));
                }
            }

            if (isMounted.current) {
                setAttachments(attachments);
            }
        }

        fetchData();
        fetchAttachments();
    }, [id, token]);

    const submitHomework = async (e) => {
        e.preventDefault();

        let fileIds = [];
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

        try {
            await Api.homework.submitHomework(token, messageToTeacher, fileIds);

            toast.info(localized('toast.submitHomeworkSuccessful'));
        }
        catch (err) {
            toast.error(localized('toast.submitHomeworkError'));
        }
    }

    if (data === undefined) {
        return null;
    }
    return (
        <div className='homework-page'>
            <div className={ homeworkClassName }>
                <div className='header'>
                    <h1>{ data.id }, { data.clazz.name }</h1>
                </div>

                <div className='data'>
                    <h1>{ data.title }</h1>
                    <div className='text' dangerouslySetInnerHTML={{__html: data.text}} />
                    <h1>{ localized('teacherPage.fromDate') } { data.fromDate.split('T')[0] }</h1>
                    <h1>{ localized('teacherPage.due') } { data.due }</h1>

                    <br />
                </div>

                { attachments.map((attachmentData) => {
                    console.log(attachmentData)
                    return (
                        <Attachment data={ attachmentData } />
                    )
                }) }
            </div>

            <form className={ formClassName } onSubmit={ submitHomework }>
                <div className='google-input-container'>
                    <GoogleInput placeholder={ localized('studentsPage.messageForTeacher') } onChange={ setMessageToTeacher } />
                </div>
                <input type='file' name='image' multiple className='form-child' onChange={(e) => setFiles(e.target.files)} />
                <button type='submit' className='form-child'>Submit</button>
            </form>
        </div>
    )
}

export { Homework }
