import { useState } from "react";
import { DelayedRedirect } from "./DelayedRedirect";
import '../styles/404.css';

const _404 = ({ getClassNameByTheme }) => {
    const [redirect, setRedirect] = useState(undefined);

    const backToHomePage = () => {
        setRedirect( <DelayedRedirect to={ "/" } delay={ 0 } /> );
    }

    return (
        <div className={ getClassNameByTheme("_404") }>
            <p className={ getClassNameByTheme("title-text") }>Oops</p>
            <p className={ getClassNameByTheme("description-text") }>Error 404 - Couldn't find the webpage you are looking for</p>

            <button className={ getClassNameByTheme("back-to-home-page-button") }
                    onClick={ backToHomePage }>Back To Home Page</button>

            { redirect }
        </div>
    )
}

export { _404 };
