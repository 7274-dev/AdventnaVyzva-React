import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../App';
import * as Api from '../../api';
import './MDInput.css';

const MDInput = ({ token, children }) => {
    const [md, setMd] = useState(children);
    const [html, setHtml] = useState(md);
    const mdDiv = useRef();
    const [timeoutId, setTimeoutId] = useState(null);
    const mdInputClassName = useTheme('md-input');

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setTimeoutId(setTimeout(async () => {
            setHtml(md);
            // setHtml((await(await Api.utils.markdownToHtml(token, md)).json()).response);
        }, 500));
    }, [md]);

    useEffect(() => {
        mdDiv.current.addEventListener('input', (e) => {
            setMd(e.target.innerHTML);
        });
    }, []);

    return (
        <div className={ mdInputClassName }>
            <div contentEditable ref={ mdDiv }>
                { children }
            </div>

            <div className='unselectable' dangerouslySetInnerHTML={{__html: html}} />
        </div>
    )
}

export { MDInput }
