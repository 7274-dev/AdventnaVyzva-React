import { useTheme } from "../../App";
import { ReactComponent as TreeIcon } from "../../images/tree.svg";
import { DelayedRedirect } from "../../components";
import { localized } from "../../hooks/useLocalization";

const LoginRedirect = () => {
    const loginRedirectClassName = useTheme('login-redirect');

    const redirect = window.location.pathname.toString() === '/' ? '/login' : `/login?redirect=${window.location.pathname.toString().slice(1)}`;

    return (
        <div className={ loginRedirectClassName }>
            <TreeIcon />
            <h1>{ localized('loginRedirect.prompt') }</h1><br/>
            <h1>{ localized('loginRedirect.redirect') }</h1>
            <DelayedRedirect to={ redirect } delay={ 3500 } />
        </div>
    )
}

export {
    LoginRedirect
}
