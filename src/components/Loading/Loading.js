import { useTheme } from '../../App';
import { localized } from '../../hooks/useLocalization';
import LoadingVideo from '../../images/loading.mp4';
import './Loading.css';

const Loading = () => {
    const loadingComponentClassName = useTheme('loading-component');

    return (
        <div className={ loadingComponentClassName }>
            <h1>{ localized('loading.title') }</h1>
            <video src={ LoadingVideo } controls={ false } autoPlay loop />

            <h2>{ localized('loading.text') }</h2>
        </div>
    )
}

export { Loading }
