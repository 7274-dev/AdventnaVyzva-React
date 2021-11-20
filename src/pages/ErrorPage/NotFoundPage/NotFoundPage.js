import { useTheme } from '../../../App';
import { BackToHomePageButton } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import './NotFoundPage.css';

const NotFoundPage = () => {
    const notFoundPageClassName = useTheme('not-found-page');
    const titleTextClassName = useTheme('title-text');
    const descriptionTextClassName = useTheme('description-text');

    return (
        <div className={ notFoundPageClassName }>
            <p className={ titleTextClassName }>{ localized('404.title') }</p>
            <p className={ descriptionTextClassName }>{ localized('404.text') }</p>

            <BackToHomePageButton />
        </div>
    )
}

export { NotFoundPage }
