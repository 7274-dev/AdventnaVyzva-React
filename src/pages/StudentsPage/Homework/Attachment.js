import { localized } from '../../../hooks/useLocalization';
import { backendUrl } from "../../../api";

const Attachment = ({ data }) => {
    const fileUrl = `${backendUrl}/api/file/download?fileId=${data.file.id}`;

    return (
        <div>
            <img src={ fileUrl } alt={ localized('toast.attachmentAlt') } title={ localized('toast.attachmentAlt') } />
        </div>
    )
}

export { Attachment }
