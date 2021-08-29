import { useTheme } from '../App';
import { redirectMeTo } from './RedirectMeTo';
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
            <p className={ titleTextClassName }>Oops</p>
            <p className={ descriptionTextClassName }>Error 404 - Couldn't find the webpage you are looking for</p>

            <button className={ backToHomePageButtonClassName } onClick={ backToHomePage }>Back To Home Page</button>
        </div>
    )
}

export { NotFoundPage };
