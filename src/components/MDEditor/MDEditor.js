import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../App';
import * as Api from '../../api';
import { toast } from 'react-toastify';
import './MDEditor.css';

const MDEditor = ({ token, children, onChange }) => {
    // TODO code: make me an actual editor

    const [md, setMd] = useState(children);
    const [html, setHtml] = useState(md);
    const [timeoutId, setTimeoutId] = useState(null);
    const mdRef = useRef();
    const mdInputClassName = useTheme('editor');

    const getSelection = () => {
        return window.getSelection();
    }

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setTimeoutId(setTimeout(async () => {
            setHtml(md);
            onChange(md);
            // setHtml((await(await Api.utils.markdownToHtml(token, md)).json()).response);
        }, 500));
    }, [md]);

    useEffect(() => {
        mdRef.current.addEventListener('input', (e) => {
            setMd(e.target.innerHTML);
        });

    }, []);

    const addHeading = () => {
        // FIXME

        console.log('clicked', getSelection(), getSelection().getRangeAt(0))
        console.log(getSelection().anchorNode.toString() !== '[object Text]' || getSelection().focusNode.parentNode !== mdRef.current)
        console.log(getSelection().anchorNode.toString(), getSelection().focusNode.parentNode);

        if (getSelection().anchorNode.toString() !== '[object Text]' || getSelection().focusNode.parentNode !== mdRef.current) {
            toast.error('Please select text in markdown editor');
            return;
        }

        toast.info(getSelection());
    }

    return (
        <div className={ mdInputClassName }>
            <div className='tools'>
                {/* TODO code: localization */}
                <button onClick={ addHeading }>Heading</button>
                <button><em>Italic</em></button>
                <button><strong>Bold</strong></button>
            </div>

            <div className='input'>
                <div contentEditable ref={ mdRef } className='md' dangerouslySetInnerHTML={{__html: children}} />

                <div className='unselectable html' dangerouslySetInnerHTML={{__html: html}} />
            </div>
        </div>
    )
}

export { MDEditor }
