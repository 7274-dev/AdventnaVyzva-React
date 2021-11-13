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
import HRImageDark from '../../images/hr-dark.png';
import HRImageLight from '../../images/hr-light.png';
import BoldImageDark from '../../images/bold-dark.png';
import BoldImageLight from '../../images/bold-light.png';
import ItalicImageDark from '../../images/italic-dark.png';
import ItalicImageLight from '../../images/italic-light.png';
import UnderlineImageDark from '../../images/underline-dark.png';
import UnderlineImageLight from '../../images/underline-light.png';
import CreateLinkImageDark from '../../images/create-link-dark.png';
import CreateLinkImageLight from '../../images/create-link-light.png';
import QuestionMarkImageDark from '../../images/questionmark-dark.png';
import QuestionMarkImageLight from '../../images/questionmark-light.png';
import './MDEditor.css';

const MDEditor = ({ token, children, onChange }) => {
    const [defaultMd] = useState(useDefaultValue(localStorage.getItem('markdown'), children));
    const [md, setMd] = useState(defaultMd);
    const [html, setHtml] = useState(md);
    const [timeoutId, setTimeoutId] = useState(null);
    const [isModalActive, setIsModalActive] = useState(false);
    const [isHelpActive, setIsHelpActive] = useState(false);
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

    const onToolClick = (command, value = null) => {
        document.execCommand(command, false, value);
    }

    const addLink = () => {
        setIsModalActive(false);

        if (!linkNameRef.current || !linkUrlRef.current) {
            return;
        }
        if (!linkNameRef.current.value || !linkUrlRef.current.value) {
            toast.error(localized('teacherPage.newHomework.createLink.empty'));
            return;
        }

        const linkUrl = `${linkUrlRef.current.value.toString().startsWith('https://') ? '' : 'https://'}${linkUrlRef.current.value}`;
        document.execCommand('insertHTML', false, `<a href="${linkUrl}">${linkNameRef.current.value}</a>`);
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
                {/* TODO code: add headings */}
                <button type='button' onClick={() => onToolClick('justifyLeft')}><img src={ isDarkMode ? JustifyLeftImageDark : JustifyLeftImageLight } alt={ localized('teacherPage.newHomework.justifyLeft') } title={ localized('teacherPage.newHomework.justifyLeft') } /></button>
                <button type='button' onClick={() => onToolClick('justifyCenter')}><img src={ isDarkMode ? JustifyCenterImageDark : JustifyCenterImageLight } alt={ localized('teacherPage.newHomework.justifyCenter') } title={ localized('teacherPage.newHomework.justifyCenter') } /></button>
                <button type='button' onClick={() => onToolClick('bold')}><img src={ isDarkMode ? BoldImageDark : BoldImageLight } alt={ localized('teacherPage.newHomework.bold') } title={ localized('teacherPage.newHomework.bold') } /></button>
                <button type='button' onClick={() => onToolClick('italic')}><img src={ isDarkMode ? ItalicImageDark : ItalicImageLight } alt={ localized('teacherPage.newHomework.italic') } title={ localized('teacherPage.newHomework.italic') } /></button>
                <button type='button' onClick={() => onToolClick('underline')}><img src={ isDarkMode ? UnderlineImageDark : UnderlineImageLight } alt={ localized('teacherPage.newHomework.underline') } title={ localized('teacherPage.newHomework.underline') } /></button>
                <button type='button' onClick={() => setIsModalActive(true)}><img src={ isDarkMode ? CreateLinkImageDark : CreateLinkImageLight } alt={ localized('teacherPage.newHomework.createLink') } title={ localized('teacherPage.newHomework.createLink') } /></button>
                <button type='button' onClick={() => onToolClick('insertHTML', '<hr />')}><img style={{height: '25%'}} src={ isDarkMode ? HRImageDark : HRImageLight } alt={ localized('teacherPage.newHomework.hr') } title={ localized('teacherPage.newHomework.hr') } /></button>

                <div className='help-separator' />
                <button type='button' className={ `help ${isHelpActive ? 'active' : ''}` } onClick={() => setIsHelpActive(!isHelpActive)}>
                    <img src={ isDarkMode ? QuestionMarkImageDark : QuestionMarkImageLight } alt={ localized('teacherPage.newHomework.questionMark') } />

                    <div className='docs'>
                        {/* Q: is this ok? */}
                        Všetky zadania úloh môžete vytvárať v tomto textovom editore. Obsah, ktorý v editore vytvoríte, môžete priamo nahrať ako zadanú úlohu pomocou elementov v spodnej strednej časti. Nezabudnite ho pomenovať a priradiť k nemu dátum.
                        Zadanie úlohy pozostáva z hlavného nadpisu, nachádzajúceho sa v ľavom hornom rohu, dvoch podnadpisov a zo samotného tela textu. Do tela textu môžete vkladať aj odkazy. Vzhľad textu môžete upravovať pomocou jednotlivých nástrojov v ľavom hornom rohu.
                        Všetky elementy editoru sú navrhnuté tak, aby boli čo najefektívnejšie a zároveň najjednoduchšie používané.
                    </div>
                </button>
            </div>

            <div className='input'>
                <div contentEditable ref={ mdRef } className='md' dangerouslySetInnerHTML={{__html: defaultMd}} />

                <div className='unselectable html' dangerouslySetInnerHTML={{__html: html}} />
            </div>

            <Modal finishCallback={ addLink } active={ isModalActive }>
                <ShortInput text={ localized('teacherPage.newHomework.createLink.name') } inputRef={ linkNameRef } />
                <ShortInput text={ localized('teacherPage.newHomework.createLink.link') } inputRef={ linkUrlRef } />
            </Modal>
        </div>
    )
}

export { MDEditor }
