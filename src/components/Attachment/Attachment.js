import { useEffect, useState } from 'react';
import { getFileType } from '../../hooks/getFileType';
import { localized } from '../../hooks/useLocalization';
import { toast } from 'react-toastify';
import * as Api from '../../api';
import './Attachment.css';

const Attachment = ({ token, data }) => {
    const [fileType, setFileType] = useState(null);
    const fileUrl = `${Api.backendUrl}/api/file/download?fileId=${data?.file?.id}`;

    const fetchFileType = async () => {
        const response = await Api.file.getFileType(token, data.file.id);

        if (response.status !== 200) {
            toast.error(localized('toast.fileTypeFetchFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        setFileType(getFileType((await response.json()).response));
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchFileType();
    }, []);

    return (
        <div className='attachment'>
            { fileType === 'image' && <img src={ fileUrl } alt={ localized('toast.attachmentAlt') } title={ data.file.name } /> }
            { fileType === 'video' && <video src={ fileUrl } title={ data.file.name } controls /> }
            { fileType === undefined && <a href={ fileUrl } title={ data.file.name } download>{ data.file.name }</a> }
        </div>
    )
}

export { Attachment }
