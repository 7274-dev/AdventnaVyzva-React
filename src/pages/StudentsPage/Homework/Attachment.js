import { localized } from '../../../hooks/useLocalization';

const Attachment = ({ data }) => {
    // FIXME

    const base64 = btoa(unescape(encodeURIComponent(data)));

    console.log(`DATA:`, data);
    console.log(`URL OBJECT: ${URL.createObjectURL(new Blob([data]))}`)
    console.log(`URL OBJECT: ${URL.createObjectURL(new Blob([base64]))}`)
    console.log(`BASE64: ${base64}`);

    return (
        <div>
            <img src={ URL.createObjectURL(new Blob([data])) } alt={ localized('toast.attachmentAlt') } />
            <img src={ URL.createObjectURL(new Blob([base64])) } alt={ localized('toast.attachmentAlt') } />
            <img src={ `data:image/jpeg;base64,${base64}` } alt={ localized('toast.attachmentAlt') } />
            <img src={ `data:image/png;base64,${base64}` } alt={ localized('toast.attachmentAlt') } />
            <img src={ data } alt={ localized('toast.attachmentAlt') } />
            <img src={ base64 } alt={ localized('toast.attachmentAlt') } />
        </div>
    )
}

export { Attachment }
