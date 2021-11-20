import { isDefined } from '../../../hooks/isDefined';
import { localized } from '../../../hooks/useLocalization';
import './HomeworkSection.css';

const Submission = ({ data }) => {
    console.log(`submission`, data)

    if (!isDefined(data)) {
        return null;
    }
    return (
        <div className='submission'>
            <h1>{ localized('teacherPage.submission.content') }: { data.content }</h1>
        </div>
    )
}

export { Submission }
