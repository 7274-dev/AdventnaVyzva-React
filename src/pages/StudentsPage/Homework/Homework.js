import { useState, useEffect } from 'react';
import { useTheme } from '../../../App';
import useIsMounted from 'ismounted';
import { GoogleInput } from '../../../components';
import * as Api from '../../../api';
import { toast } from 'react-toastify';
import './Homework.css';

const Homework = ({ token }) => {
    // TODO code: finish me
    // submitting, fetching files

    const [data, setData] = useState(undefined);
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

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (err) => reject(err);

            reader.readAsDataURL(file);
        });
    }

    const submitHomework = async (e) => {
        e.preventDefault();

        console.log(files, messageToTeacher)

        let fileIds = [];
        for (const file of files) {
            console.log(file)
            const response = await Api.file.uploadFile(token, file.name, await readFile(file));

            if (response.status === 200) {
                console.log(`pushin`)
                fileIds.push((await response.json()).response.id)
            }
            else {
                toast.error(`Couldn\'t upload file ${file.name}`);
            }
        }

        try {
            await Api.homework.submitHomework(token, messageToTeacher, fileIds);

            toast.info('Homework submitted successfully');
        }
        catch (err) {
            // TODO localization
            toast.error('Couldn\'t submit homework');
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
                    <h2 dangerouslySetInnerHTML={{__html: data.text}} />
                    <h1>{ data.fromDate.split('T')[0] }</h1>
                    <h1>{ data.due }</h1>

                    <br />
                </div>
            </div>

            <form className={ formClassName } onSubmit={ submitHomework }>
                <div className='google-input-container'>
                    {/* TODO localization */}
                    <GoogleInput placeholder='Message for teacher' changeCallback={ setMessageToTeacher } />
                </div>
                <input type='file' name='image' multiple className='form-child' onChange={(e) => setFiles(e.target.files)} />
                <button type='submit' className='form-child'>Submit</button>
            </form>
        </div>
    )
}

export { Homework }
