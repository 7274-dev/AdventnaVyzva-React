import '../styles/404.css';

const _404 = () => {
    const backToHomePage = () => {
        window.location = "/";
    }

    return (
        <div className="_404">
            <p className="title-text">Oops</p>
            <p className="description-text">Error 404 - Couldn't find webpage you are looking for</p>

            <button className="back-to-home-page-button" onClick={ backToHomePage }>Back To Home Page</button>
        </div>
    )
}

export { _404 };
