import { useTheme } from '../../App';
import { DelayedRedirect } from '../../components';
import { localized } from '../../hooks/useLocalization';
import TreeIcon from '../../images/logo.png';

const LoginRedirect = () => {
    const loginRedirectClassName = useTheme('login-redirect');

    const redirect = window.location.pathname.toString() === '/' ? '/login' : `/login?redirect=${window.location.pathname.toString().slice(1)}`;

    return (
        <div className={ loginRedirectClassName }>
            <img src={ TreeIcon } alt={ localized('studentsPage.christmasTree') } />
            <h1>{ localized('loginRedirect.prompt') }</h1><br/>
            <h1>{ localized('loginRedirect.redirect') }</h1>
            <DelayedRedirect to={ redirect } delay={ 3500 } />
        </div>
    )
}

export {
    LoginRedirect
}
