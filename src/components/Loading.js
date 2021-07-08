import { useTheme } from '../App';
import LoadingGif from '../images/loading.gif';
import '../styles/Loading.css';

const Loading = () => {
    // TODO graphics: change loading animation

    const loadingComponentClassName = useTheme('loading-component');

    return (
        <div className={ loadingComponentClassName }>
            <h1>Loading...</h1>
            <img alt='Loading Animation' src={ LoadingGif } />
            <h2>Please wait...</h2>
        </div>
    )
}

export { Loading };
