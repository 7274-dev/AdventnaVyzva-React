import { useEffect, useState } from 'react';
import { getFileType } from '../../../hooks/getFileType';
import { localized } from '../../../hooks/useLocalization';
import { toast } from 'react-toastify';
import * as Api from '../../../api';

const Attachment = ({ token, data }) => {
    console.log(`xd`, data)

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
        <div>
            { fileType === 'image' && <img src={ fileUrl } alt={ localized('toast.attachmentAlt') } title={ localized('toast.attachmentAlt') } /> }
            { fileType === 'video' && <video src={ fileUrl } title={ localized('toast.attachmentAlt') } controls /> }
            { fileType === undefined && <a href={ fileUrl } title={ localized('toast.attachmentAlt') } download>{ data.file.name }</a> }
        </div>
    )
}

export { Attachment }
