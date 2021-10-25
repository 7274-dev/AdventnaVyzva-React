import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../App';
import { useDefaultValue } from '../../hooks/useDefaultValue';
import { Modal, ShortInput } from '..';
import * as Api from '../../api';
import { localized } from '../../hooks/useLocalization';
import { toast } from 'react-toastify';
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
import './MDEditor.css';

const MDEditor = ({ token, children, onChange }) => {
    const [defaultMd] = useState(useDefaultValue(localStorage.getItem('markdown'), children));
    const [md, setMd] = useState(defaultMd);
    const [html, setHtml] = useState(md);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const mdRef = useRef();
    const linkNameRef = useRef();
    const linkUrlRef = useRef();
    const mdInputClassName = useTheme('md-editor');
    const isDarkMode = useTheme('').includes('dark');

    const updateHtml = async () => {
        if (!md) {
            return;
        }

        setHtml(md);
        // setHtml((await(await Api.utils.markdownToHtml(token, md)).json()).response);

        onChange(md);
        localStorage.setItem('markdown', md);
    }

    const onToolClick = (command) => {
        document.execCommand(command, false, null);
    }

    const addLink = () => {
        if (!linkNameRef.current || !linkUrlRef.current) {
            setIsModalActive(false);
            return;
        }
        if (!linkNameRef.current.value || !linkUrlRef.current.value) {
            toast.error(localized('teacherPage.newHomework.createLink.empty'));
            setIsModalActive(false);
            return;
        }

        mdRef.current.innerHTML = md + `<a href="${linkUrlRef.current.value.toString().startsWith('https://') ? '' : 'https://'}${linkUrlRef.current.value}">${linkNameRef.current.value}</a>`;
        setMd(mdRef.current.innerHTML);
        setIsModalActive(false);
        updateHtml();
    }

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setTimeoutId(setTimeout(updateHtml, 500));
    }, [md]);

    useEffect(() => {
        mdRef.current.addEventListener('input', (e) => {
            setMd(e.target.innerHTML);
        });
    }, []);

    return (
        <div className={ mdInputClassName }>
            <div className='tools'>
                <button type='button' onClick={() => onToolClick('justifyLeft')}><img src={ isDarkMode ? JustifyLeftImageDark : JustifyLeftImageLight } alt='Justify left' /></button>
                <button type='button' onClick={() => onToolClick('justifyCenter')}><img src={ isDarkMode ? JustifyCenterImageDark : JustifyCenterImageLight } alt='Justify center' /></button>
                <button type='button' onClick={() => onToolClick('bold')}><img src={ isDarkMode ? BoldImageDark : BoldImageLight } alt='Bold' /></button>
                <button type='button' onClick={() => onToolClick('italic')}><img src={ isDarkMode ? ItalicImageDark : ItalicImageLight } alt='Italic' /></button>
                <button type='button' onClick={() => onToolClick('underline')}><img src={ isDarkMode ? UnderlineImageDark : UnderlineImageLight } alt='Underline' /></button>
                <button type='button' onClick={() => setIsModalActive(true)}>Test</button>
            </div>

            <div className='input'>
                <div contentEditable ref={ mdRef } className='md' dangerouslySetInnerHTML={{__html: defaultMd}} />

                <div className='unselectable html' dangerouslySetInnerHTML={{__html: html}} />
            </div>

            <Modal finishCallback={ addLink } active={ isModalActive }>
                <ShortInput text={ localized('teacherPage.newHomework.createLink.name') } inputRef={ linkNameRef } />
                <ShortInput text={ localized('teacherPage.newHomework.createLink.link') } inputRef={ linkUrlRef } />
            </Modal>

            {/* TODO code: add docs */}
        </div>
    )
}

export { MDEditor }
