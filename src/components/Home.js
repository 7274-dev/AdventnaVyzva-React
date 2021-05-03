import { TeacherPage } from './TeacherPage';
import { StudentsPage } from './StudentsPage';
import { DelayedRedirect } from './DelayedRedirect';

const Home = ({ isLoggedIn }) => {
    if (!isLoggedIn) {
        return (
            <div className="login-redirect">
                <h1>You have to log in to use this website!</h1>
                <h1>Redirecting...</h1>
                <DelayedRedirect to="/login" delay={ 3500 }/>
            </div>
        )
    }

    return (
        <div>
            
        </div>
    )
}

export { Home };
