import { useState } from "react";
import { DelayedRedirect } from "./DelayedRedirect";
import '../styles/404.css';

const _404 = ({ getClassNameByDarkMode }) => {
    const [redirect, setRedirect] = useState(undefined);

    const backToHomePage = () => {
        setRedirect( <DelayedRedirect to={ "/" } delay={ 0 } /> );
    }

    return (
        <div className={ getClassNameByDarkMode("_404") }>
            <p className={ getClassNameByDarkMode("title-text") }>Oops</p>
            <p className={ getClassNameByDarkMode("description-text") }>Error 404 - Couldn't find webpage you are looking for</p>

            <button className={ getClassNameByDarkMode("back-to-home-page-button") }
                    onClick={ backToHomePage }>Back To Home Page</button>

            { redirect }
        </div>
    )
}

export { _404 };
