import { TeacherPage } from './TeacherPage';
import { StudentsPage } from './StudentsPage';
import { DelayedRedirect } from './DelayedRedirect';
import { ReactComponent as TreeIcon } from '../images/tree.svg'
import '../styles/Home.css';

const Home = ({ isLoggedIn }) => {
    if (!isLoggedIn) {
        return (
            <>
                <TreeIcon />
                <h1>You have to log in to use this website!</h1><br/>
                <h1>Redirecting...</h1>
                <DelayedRedirect to="/login" delay={ 3500 }/>
            </>
        )
    }

    return (
        <div>
            
        </div>
    )
}

export { Home };
