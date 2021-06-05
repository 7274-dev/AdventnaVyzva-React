import { useState } from "react";
import { DelayedRedirect } from "./DelayedRedirect";
import '../styles/404.css';

const _404 = ({ useTheme }) => {
    const [redirect, setRedirect] = useState(undefined);

    const backToHomePage = () => {
        setRedirect( <DelayedRedirect to={ "/" } delay={ 0 } /> );
    }

    return (
        <div className={ useTheme("_404") }>
            <p className={ useTheme("title-text") }>Oops</p>
            <p className={ useTheme("description-text") }>Error 404 - Couldn't find the webpage you are looking for</p>

            <button className={ useTheme("back-to-home-page-button") }
                    onClick={ backToHomePage }>Back To Home Page</button>

            { redirect }
        </div>
    )
}

export { _404 };
