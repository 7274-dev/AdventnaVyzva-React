import { render } from '@testing-library/react';
import { StudentsPage } from './components/StudentsPage';
import { TeacherPage } from './components/TeacherPage';
import { Login } from './components/Login';
import { _404 } from './components/404';
import { About } from './components/About';
import { DelayedRedirect } from './components/DelayedRedirect';
import { Settings, Setting } from './components/Settings';
import { SnowFlakes } from './components/SnowFlakes';

// run all tests with `yarn test`

describe('syntax tests', () => {
    test('students page', () => {
        render(<StudentsPage token={null} darkMode={false} setDarkMode={()=>{}} />);
    });

    test('teacher page', () => {
        render(<TeacherPage />);
    });

    test('login page', () => {
        render(<Login setToken={()=>{}} darkMode={false} />);
    });

    test('404 page', () => {
        render(<_404 />);
    });

    test('about page', () => {
        render(<About />);
    });

    test('delayed redirect component', () => {
        render(<DelayedRedirect delay={ 1000 } to="/" />);
    });

    test('settings component', () => {
        render(<Settings token={null}><Setting name="setting" onChange={()=>{}} initialValue={false} /></Settings>);
    });

    test('snowflakes component', () => {
        render(<SnowFlakes />);
    });
});
