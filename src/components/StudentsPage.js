import { useTheme } from '../App';
import { Settings, Setting } from './Settings';
import { BallsContainer, Ball } from './Balls';
import Tree from '../images/stromcek.ico';
import '../styles/StudentsPage.css';

const StudentsPage = ({ token, darkMode, setDarkMode, snowflakes, setSnowflakes }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903403475004/IMG_20210427_120218.jpg

    // TODO code: add completed homework balls drag'n'drop on tree (with save in cookies)

    const studentsPageClassName = useTheme('students-page');
    const treeClassName = useTheme('tree', 'unselectable');

    return (
        <div className={ studentsPageClassName } unselectable='on'>
            <Settings token={ token } additionalSettingsClassName='settings-students-page'
                      popupRotation='bottom'>
                <Setting name='Dark Mode' initialValue={ darkMode } onChange={ setDarkMode } type='switch' />
                <Setting name='Snowflakes' initialValue={ snowflakes } onChange={ setSnowflakes } type='switch' />
            </Settings>

            <div className={ treeClassName }>
                <img draggable={ false } src={ Tree } alt='Christmas Tree' />

                <BallsContainer>
                    <Ball index={ 0 } image={ <div style={{width: '100%', height: '100%', backgroundColor: 'blue'}} /> } />
                </BallsContainer>
            </div>
        </div>
    )
}

export { StudentsPage };
