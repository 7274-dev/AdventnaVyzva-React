import { useTheme } from '../App';
import { redirectMeTo } from './RedirectMeTo';
import { localized } from '../hooks/useLocalization';
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
    const backToHomePage = () => {
        redirectMeTo('/');
    }

    const notFoundPageClassName = useTheme('not-found-page');
    const titleTextClassName = useTheme('title-text');
    const descriptionTextClassName = useTheme('description-text');
    const backToHomePageButtonClassName = useTheme('back-to-home-page-button');

    return (
        <div className={ notFoundPageClassName }>
            <p className={ titleTextClassName }>{ localized('404.title') }</p>
            <p className={ descriptionTextClassName }>{ localized('404.text') }</p>

            <button className={ backToHomePageButtonClassName } onClick={ backToHomePage }>{ localized('uhavenopowerhere.backToHomePage') }</button>
        </div>
    )
}

export { NotFoundPage }
