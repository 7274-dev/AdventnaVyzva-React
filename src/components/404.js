import { useState } from "react";
import { DelayedRedirect } from "./DelayedRedirect";
import '../styles/404.css';

const _404 = ({ darkMode }) => {
    const [redirect, setRedirect] = useState(undefined);

    const backToHomePage = () => {
        setRedirect( <DelayedRedirect to={ "/" } delay={ 0 } /> );
    }

    return (
        // "_404 " + darkMode ? "_404-dark" : "_404-light"
        <div className={ `_404 ${darkMode ? "_404-dark" : ""}` }>
            <p className={ `title-text ${darkMode ? "title-text-dark" : ""}` }>Oops</p>
            <p className={ `description-text ${darkMode ? "description-text-dark" : ""}` }>Error 404 - Couldn't find webpage you are looking for</p>

            <button className={ `back-to-home-page-button ${darkMode ? "back-to-home-page-button-dark" : ""}` }
                    onClick={ backToHomePage }>Back To Home Page</button>

            { redirect }
        </div>
    )
}

export { _404 };
