import { localized } from '../../../hooks/useLocalization';

const Attachment = ({ data }) => {
    return (
        <div>
            <img src={ data } alt={ localized('toast.attachmentAlt') } title={ localized('toast.attachmentAlt') } />
        </div>
    )
}

export { Attachment }
