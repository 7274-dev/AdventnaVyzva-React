import { useTheme } from '../App';
import '../styles/Loading.css';

const Loading = () => {
    const loadingComponentClassName = useTheme("loading-component");

    return (
        <div className={ loadingComponentClassName }>
            <h1>Loading...</h1>
            <h2>Please wait...</h2>
        </div>
    )
}

export { Loading };
