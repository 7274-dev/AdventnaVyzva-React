import { useState, useEffect } from 'react';
import { useTheme } from '../../../App';
import useIsMounted from 'ismounted';
import { GoogleInput } from '../../../components';
import * as Api from '../../../api';
import './Homework.css';

const Homework = ({ token }) => {
    // TODO code: finish me
    // submitting, fetching files

    const [data, setData] = useState(undefined);
    const isMounted = useIsMounted();
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];
    const homeworkClassName = useTheme('homework');
    const formClassName = useTheme('form');

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

            <form className={ formClassName }>
                {/* TODO code: finish me */}
                <div className='google-input-container'>
                    <GoogleInput placeholder='Message for teacher' />
                </div>
                <input type='file' name='image' multiple />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export { Homework }
