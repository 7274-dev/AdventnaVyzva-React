import { useTheme } from '../App';
import { redirectMeTo } from './RedirectMeTo';
import '../styles/NotFoundPage.css';
import { localized } from '../hooks/useLocalization';

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
            <p className={ titleTextClassName }>{ localized('oops') }</p>
            <p className={ descriptionTextClassName }>{ localized('error.404') }</p>

            <button className={ backToHomePageButtonClassName } onClick={ backToHomePage }>Back To Home Page</button>
        </div>
    )
}

export { NotFoundPage };
