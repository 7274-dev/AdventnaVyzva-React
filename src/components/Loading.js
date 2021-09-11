import { useTheme } from '../App';
import { localized } from '../hooks/useLocalization';
import LoadingGif from '../images/loading.gif';
import LoadingVideo from '../images/logo_animation.mp4';
import '../styles/Loading.css';

const Loading = () => {
    // TODO graphics: fix loading animation

    const loadingComponentClassName = useTheme('loading-component');

    return (
        <div className={ loadingComponentClassName }>
            <h1>{ localized('loading.title') }</h1>
            <img alt={ localized('loading.animation') } src={ LoadingGif } />
            {/*<video src={ LoadingVideo } controls={ false } autoPlay={ true } loop={ true } />*/}

            <h2>{ localized('loading.text') }</h2>
        </div>
    )
}

export { Loading };
