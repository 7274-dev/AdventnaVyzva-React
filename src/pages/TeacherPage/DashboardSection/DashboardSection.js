import { localized } from '../../../hooks/useLocalization';
import './DashboardSection.css';

const DashboardSection = ({ token }) => {
    return (
        <div className='dashboard-section'>
            <h1>{ localized('teacherPage.comingSoon') }</h1>
        </div>
    )
}

export { DashboardSection }
