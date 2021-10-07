import { useTheme } from '../App';
import { BallsContainer } from './Balls';
import { localized } from '../hooks/useLocalization';
import Tree from '../images/stromcek.ico';
import '../styles/StudentsPage.css';

const StudentsPage = () => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO code: add completed homework balls drag'n'drop on tree (with save in cookies)

    const studentsPageClassName = useTheme('students-page');
    const treeClassName = useTheme('tree', 'unselectable');

    return (
        <div className={ studentsPageClassName }>
            <div className={ treeClassName }>
                <img draggable={ false } src={ Tree } alt={ localized('studentsPage.christmasTree') } />
            </div>

            <BallsContainer ballsData={{
                0: {
                    children: [<div style={{width: '100%', height: '100%', backgroundColor: 'blue'}} />]
                }
            }} />
        </div>
    )
}

export { StudentsPage };
