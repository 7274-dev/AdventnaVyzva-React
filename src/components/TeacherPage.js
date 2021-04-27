import "../styles/TeacherPage.css";


const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-link-container">
                <a className="link-primary" href="/">Home</a>
            </div>
        </div>
    )
}

const TeacherPage = () => {
    return (
        <div>
            <Navbar />
        </div>
    )
}

export { TeacherPage };
