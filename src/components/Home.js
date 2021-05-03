import { TeacherPage } from './TeacherPage';
import { StudentsPage } from './StudentsPage';
import { DelayedRedirect } from './DelayedRedirect';

const Home = ({ isLoggedIn }) => {
    if (!isLoggedIn) {
        return (
            <>
                <h1>You have to log in to use this website!</h1><br/>
                <h1>Redirecting...</h1>
                <DelayedRedirect to="/login" delay={3500}/>
            </>
        )
    }
    return (
        <div>
            
        </div>
    )
}

export { Home };
