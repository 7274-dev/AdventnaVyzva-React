import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../App';
import * as Api from '../../api';
import JustifyLeftImageDark from '../../images/justifyleft-dark.png';
import JustifyLeftImageLight from '../../images/justifyleft-light.png';
import JustifyCenterImageDark from '../../images/justifycenter-dark.png';
import JustifyCenterImageLight from '../../images/justifycenter-light.png';
import BoldImageDark from '../../images/bold-dark.png';
import BoldImageLight from '../../images/bold-light.png';
import ItalicImageDark from '../../images/italic-dark.png';
import ItalicImageLight from '../../images/italic-light.png';
import UnderlineImageDark from '../../images/underline-dark.png';
import UnderlineImageLight from '../../images/underline-light.png';
import OrderedListImageDark from '../../images/orderedlist-dark.png';
import OrderedListImageLight from '../../images/orderedlist-light.png';
import UnorderedListImageDark from '../../images/unorderedlist-dark.png';
import UnorderedListImageLight from '../../images/unorderedlist-light.png';
import './MDEditor.css';

const MDEditor = ({ token, children, onChange }) => {
    // TODO code: change me so I only have one window

    const [md, setMd] = useState(children);
    const [html, setHtml] = useState(md);
    const [timeoutId, setTimeoutId] = useState(null);
    const mdRef = useRef();
    const mdInputClassName = useTheme('md-editor');
    const isDarkMode = useTheme('').includes('dark');

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
                <button type='button' data-command='justifyLeft' ref={ tool }><img src={ isDarkMode ? JustifyLeftImageDark : JustifyLeftImageLight } alt='Justify left' /></button>
                <button type='button' data-command='justifyCenter' ref={ tool }><img src={ isDarkMode ? JustifyCenterImageDark : JustifyCenterImageLight } alt='Justify center' /></button>
                <button type='button' data-command='bold' ref={ tool }><img src={ isDarkMode ? BoldImageDark : BoldImageLight } alt='Bold' /></button>
                <button type='button' data-command='italic' ref={ tool }><img src={ isDarkMode ? ItalicImageDark : ItalicImageLight } alt='Italic' /></button>
                <button type='button' data-command='underline' ref={ tool }><img src={ isDarkMode ? UnderlineImageDark : UnderlineImageLight } alt='Underline' /></button>
                <button type='button' data-command='insertOrderedList' ref={ tool }><img src={ isDarkMode ? OrderedListImageDark : OrderedListImageLight } alt='Insert ordered list' /></button>
                <button type='button' data-command='insertUnorderedList' ref={ tool }><img src={ isDarkMode ? UnorderedListImageDark : UnorderedListImageLight } alt='Insert unordered list' /></button>
                {/* TODO code: add create link */}
            </div>

            <div className='input'>
                {/* TODO code: add save to cookies every 5 seconds */}
                <div contentEditable ref={ mdRef } className='md' dangerouslySetInnerHTML={{__html: children}} />

                <div className='unselectable html' dangerouslySetInnerHTML={{__html: html}} />
            </div>

            {/* TODO code: add docs */}
        </div>
    )
}

export { MDEditor }
