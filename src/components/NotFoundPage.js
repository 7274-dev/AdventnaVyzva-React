import { useState } from "react";
import { useTheme } from '../App';
import { DelayedRedirect } from "./DelayedRedirect";
import '../styles/NotFoundPage.css';

const NotFoundPage = () => {
    const [redirect, setRedirect] = useState(undefined);

    const backToHomePage = () => {
        setRedirect( <DelayedRedirect to={ "/" } delay={ 0 } /> );
    }

    const notFoundPageClassName = useTheme("not-found-page");
    const titleTextClassName = useTheme("title-text");
    const descriptionTextClassName = useTheme("description-text");
    const backToHomePageButtonClassName = useTheme("back-to-home-page-button");

    return (
        <div className={ notFoundPageClassName }>
            <p className={ titleTextClassName }>Oops</p>
            <p className={ descriptionTextClassName }>Error 404 - Couldn't find the webpage you are looking for</p>

            <button className={ backToHomePageButtonClassName } onClick={ backToHomePage }>Back To Home Page</button>

            { redirect }
        </div>
    )
}

export { NotFoundPage };
