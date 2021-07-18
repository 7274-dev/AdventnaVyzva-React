import { useTheme } from '../App';
import LoadingGif from '../images/loading.gif';
import LoadingVideo from '../images/logo_animation.mp4';
import '../styles/Loading.css';

const Loading = () => {
    // TODO graphics: fix loading animation

    const loadingComponentClassName = useTheme('loading-component');

    return (
        <div className={ loadingComponentClassName }>
            <h1>Loading...</h1>
            <img alt='Loading Animation' src={ LoadingGif } />
            {/*<video src={ LoadingVideo } controls={ false } autoPlay={ true } loop={ true } />*/}

            <h2>Please wait...</h2>
        </div>
    )
}

export { Loading };
