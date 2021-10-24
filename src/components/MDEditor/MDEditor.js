import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../App';
import * as Api from '../../api';
import './MDEditor.css';

const MDEditor = ({ token, children, onChange }) => {
    // TODO code: add other functionality https://youtu.be/cOeTHVlFDYs
    // TODO code: change me so I only have one window
    // TODO code: localization

    const [md, setMd] = useState(children);
    const [html, setHtml] = useState(md);
    const [timeoutId, setTimeoutId] = useState(null);
    const mdRef = useRef();
    const mdInputClassName = useTheme('md-editor');

    const tool = useCallback((node) => {
        if (!node) return;

        node.addEventListener('click', () => {
            const command = node.dataset['command'];

            document.execCommand(command, false, null);
        });
    }, []);

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

    return (
        <div className={ mdInputClassName }>
            <div className='tools'>
                {/* TODO code: add icons */}
                <button type='button' data-command='bold' ref={ tool }><strong>Bold</strong></button>
                <button type='button' data-command='italic' ref={ tool }><em>Italic</em></button>
                <button type='button' data-command='underline' ref={ tool }>Underline</button>
            </div>

            <div className='input'>
                <div contentEditable ref={ mdRef } className='md' dangerouslySetInnerHTML={{__html: children}} />

                <div className='unselectable html' dangerouslySetInnerHTML={{__html: html}} />
            </div>

            {/* TODO code: add docs */}
        </div>
    )
}

export { MDEditor }
