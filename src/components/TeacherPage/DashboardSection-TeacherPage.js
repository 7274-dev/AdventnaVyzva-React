import '../../styles/TeacherPage/DashboardSection-TeacherPage.css';
import { localized } from '../../hooks/useLocalization';

const DashboardSection = ({ token }) => {
    return (
        <div>
            <h1>
                { localized('dashboard') }
            </h1>
        </div>
    )
}

export { DashboardSection };
