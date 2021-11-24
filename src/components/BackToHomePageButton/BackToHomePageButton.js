import { useTheme } from '../../App';
import { redirectMeTo } from '../RedirectMeTo';
import { localized } from '../../hooks/useLocalization';
import './BackToHomePageButton.css';

const BackToHomePageButton = ({ url = '/' }) => {
    // TODO design: fix me
    const backToHomePageButtonClassName = useTheme('back-to-home-page-button');

    return (
        <button onClick={() => redirectMeTo(url)} className={ backToHomePageButtonClassName }>
            { localized('uhavenopowerhere.backToHomePage') }
        </button>
    )
}

export { BackToHomePageButton }
