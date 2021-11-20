import { Attachment, redirectMeTo } from '../../../components';
import { isDefined } from '../../../hooks/isDefined';
import { localized } from '../../../hooks/useLocalization';
import './HomeworkSection.css';

const Submission = ({ data }) => {
    if (!isDefined(data)) {
        return null;
    }
    // noinspection JSUnresolvedVariable
    return (
        <div className='submission'>
            <h1>{ data.id }, { localized('teacherPage.submission.by') } <a onClick={() => redirectMeTo(`/teacher/student/${data.user.userId}`)}>{ data.user.userName }</a></h1>
            <h1>{ localized('teacherPage.submission.content') }: { data.content }</h1>

            { data?.fileIds?.map((fileId, index) => <Attachment key={ index } data={ fileId } />) }
        </div>
    )
}

export { Submission }
