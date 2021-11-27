import { useState } from 'react';
import { useTheme } from '../../../App';
import { Attachment, redirectMeTo } from '../../../components';
import CheckBox from 'react-animated-checkbox';
import { isDefined } from '../../../hooks/isDefined';
import { toast } from 'react-toastify';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import './HomeworkSection.css';

const Submission = ({ token, data }) => {
    const [feedback, setFeedback] = useState(true);
    const [message, setMessage] = useState('');
    const darkMode = useTheme('').includes('dark');

    const addFeedback = async (e) => {
        e.preventDefault();

        const response = await Api.homework.addFeedbackToHomeworkSubmission(token, data.id, feedback, message);

        if (response.status !== 200) {
            toast.error(localized('teacherPage.submission.addFeedbackError').replace('$ERROR', (await response.json()).error));
        }
        else {
            toast.success(localized('teacherPage.submission.addFeedbackSuccess'));
        }

        setMessage('');
        setFeedback(true);
    };

    if (!isDefined(data)) {
        return null;
    }
    // noinspection JSUnresolvedVariable
    return (
        <div className='submission'>
            <h1>{ data.id }, { localized('teacherPage.submission.by') } <a onClick={() => redirectMeTo(`/teacher/student/${data.user.userId}`)}>{ data.user.userName }</a></h1>
            <h1>{ localized('teacherPage.submission.content') }: { data.content }</h1>

            { data.attachments.map((attachmentData, index) => <Attachment key={ index } data={ attachmentData } />) }

            <br />

            <form onSubmit={ addFeedback } className='feedback-form'>
                <p>{ localized('teacherPage.submission.message') }: </p>
                <input placeholder={ localized('teacherPage.submission.message') } onChange={(e) => setMessage(e.target.value)} value={ message } />
                <p>{ localized('teacherPage.submission.accept') }: </p>
                <CheckBox
                    checked={ feedback }
                    checkBoxStyle={{
                        checkedColor: `#34b93d`,
                        size: 25,
                        unCheckedColor: `${ darkMode ? '#e0e0e0' : '#939393' }`
                    }}
                    duration={ 200 }
                    onClick={() => setFeedback(!feedback)}
                />

                <button type='submit'>{ localized('prompt.ok') }</button>
            </form>
        </div>
    )
}

export { Submission }
