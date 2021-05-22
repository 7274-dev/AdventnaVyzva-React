import '../styles/404.css';

const _404 = ({ darkMode }) => {
    const backToHomePage = () => {
        window.location = "/";
    }

    return (
        // "_404 " + darkMode ? "_404-dark" : "_404-light"
        <div className={ `_404 ${darkMode ? "_404-dark" : ""}` }>
            <p className={ `title-text ${darkMode ? "title-text-dark" : ""}` }>Oops</p>
            <p className={ `description-text ${darkMode ? "description-text-dark" : ""}` }>Error 404 - Couldn't find webpage you are looking for</p>

            <button className={ `back-to-home-page-button ${darkMode ? "back-to-home-page-button-dark" : ""}` }
                    onClick={ backToHomePage }>Back To Home Page</button>
        </div>
    )
}

export { _404 };
