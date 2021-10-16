import { localized } from '../../../hooks/useLocalization';
import './DashboardSection.css';

const DashboardSection = ({ token }) => {
    return (
        <div>
            <h1>{ localized('teacherPage.dashboard') }</h1>
        </div>
    )
}

export { DashboardSection }
