import { TeacherPage } from './TeacherPage';
import { StudentsPage } from './StudentsPage';
import { DelayedRedirect } from './DelayedRedirect';
import { ReactComponent as TreeIcon } from '../images/tree.svg';
import '../styles/Login.css';

const Home = ({ isLoggedIn }) => {
    if (!isLoggedIn) {
        return (
            <div className="login-redirect">
                <TreeIcon />
                <h1>You have to log in to use this website!</h1><br/>
                <h1>Redirecting...</h1>
                <DelayedRedirect to="/login" delay={ 3500 }/>
            </div>
        )
    }

    return (
        <div>
            {
                // TODO: add student / teacher fetching from api
            }
            {/*<StudentsPage />*/}
            <TeacherPage />
        </div>
    )
}

export { Home };
