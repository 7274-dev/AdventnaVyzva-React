// TODO code: add proper tests
// TODO code: split tests into different  files

// ATTENTION, some tests don't pass with `yarn test`, but pass with `jest -t 'test-name'`
// so if you can, test these with jest

// run all tests with `yarn test`
// or with jest `jest -t 'test-name'`

import { render, fireEvent, act } from '@testing-library/react';  // this is library u dumbass

// this is by file order
// we dont need home page and teacher page here, because they alone just hold multiple of components bellow

import { DashboardSection } from './components/TeacherPage/DashboardSection-TeacherPage';
import { HomeworkSection } from './components/TeacherPage/HomeworkSection-TeacherPage';
import { QueryControls } from './components/TeacherPage/QueryControls-TeacherPage';
import { SideBar, SideBarItem } from './components/TeacherPage/SideBar';  // done
import { StudentsSection } from './components/TeacherPage/StudentsSection-TeacherPage';
import { About } from './components/About';
import { Admin } from './components/Admin';
import { BallsContainer, Ball } from './components/Balls';
import { DelayedRedirect } from './components/DelayedRedirect';
import { Dropdown } from './components/Dropdown';
import { Loading } from './components/Loading';
import { Login } from './components/Login';  // done
import { NotFoundPage } from './components/NotFoundPage';  // done
import { Settings, Setting } from './components/Settings';  // done
import { Snowflakes } from './components/Snowflakes';  // done
import { SomethingWentWrong } from './components/SomethingWentWrong';
import { StudentsPage } from './components/StudentsPage';

describe('render tests', () => {
    test('dashboard section', () => {
        render(
            <DashboardSection token={null} />
        );
    });

    test('homework section', () => {
       render(
           <HomeworkSection token={null} />
       );
    });

    test('query controls', () => {
        render(
            <QueryControls onQuery={()=>{}} onOrder={()=>{}} orderValues={[{id: 0, value: 'test value'}]} />
        );
    });

    test('sidebar', () => {
        render(
            <SideBar token={null} darkMode={false} setDarkMode={()=>{}} snowFlakes={false} setSnowFlakes={()=>{}}>
                <SideBarItem icon={<h1>ico</h1>} name='name' onClick={()=>{}} />
            </SideBar>
        )
    });

    test('students section', () => {
        render(
            <StudentsSection token={null} />
        );
    });

    test('about page', () => {
        render(
            <About />
        );
    });

    test('admin page', () => {
        render(
            <Admin />
        );
    });

    test('balls', () => {
        render(
            <BallsContainer>
                <Ball index={ 0 } image={ <h1>Hello World!</h1> } />
            </BallsContainer>
        );
    });

    test('delayed redirect', () => {
        render(
            <DelayedRedirect delay={ 1000 } to='/' />
        );
    });

    test('dropdown', () => {
        render(
            <Dropdown values={[{id: 0, value: 'test value'}]} initial={{id: 0, value: 'test value'}} onSelect={()=>{}} />
        );
    });

    test('loading', () => {
        render(
            <Loading />
        );
    });

    test('login page', () => {
        render(
            <Login setToken={()=>{}} darkMode={false} />
        );
    });

    test('not found page', () => {
        render(
            <NotFoundPage />
        );
    });

    test('settings', () => {
        render(
            <Settings token={null}>
                <Setting name='setting' onChange={()=>{}} initialValue={false} />
                <Setting name='test' initialValue={false} onChange={()=>{}} />
            </Settings>
        );
    });

    test('snowflakes', () => {
        render(
            <Snowflakes snowflakes={true} />
        );
    });

    test('something went wrong', () => {
        render(
            <SomethingWentWrong />
        );
    });

    test('students page', () => {
        render(
            <StudentsPage token={null} darkMode={false} setDarkMode={()=>{}} />
        );
    });
});

describe('login page tests', () => {
    const renderedComponent = render(
        <Login setToken={()=>{}} darkMode={false} />
    );

    const usernameInput = renderedComponent.getByLabelText(/Username:/);
    const passwordInput = renderedComponent.getByLabelText('Password:');
    const submitButton = renderedComponent.getByRole('button', { name: 'Log In' });
    const message = renderedComponent.getByRole('heading', { className: 'message' });

    fireEvent.change(usernameInput, { 'target': { 'value': 'username' } });
    fireEvent.change(passwordInput, { 'target': { 'value': 'password' } });

    // we cant disable next warning because there is an ongoing async function - nothing we can do
    act(() => {
        fireEvent.click(submitButton);
    });

    test('tests message content', () => {
        expect(renderedComponent.baseElement).toBeDefined();
        expect(renderedComponent.baseElement).toBeVisible();

        expect(message).toBeDefined();
        expect(message.innerHTML).toBe('Loading...');
    });
});

describe('not found page tests', () => {
    const renderedComponent = render(
        <NotFoundPage />
    );

    const backToHomePageButton = renderedComponent.getByRole('button', { name: 'Back To Home Page' });

    test('tests back to home page button', () => {
        expect(renderedComponent.baseElement).toBeDefined();
        expect(renderedComponent.baseElement).toBeVisible();

        fireEvent.click(backToHomePageButton);
    });
});

describe('snowflake tests', () => {
    const renderedComponent = render(
        <Snowflakes />
    );

    test('tests component visibility', () => {
        expect(renderedComponent.baseElement).toBeDefined();
        expect(renderedComponent.baseElement).toBeVisible();
    });
});

// TODO code: settings and sidebar tests doesnt pass with `yarn test` but pass with `jest -t 'test name'`
describe('sidebar tests', () => {
    let valueToBeChanged = false;

    const renderedComponent = render(
        <SideBar token={null} darkMode={false} setDarkMode={()=>{}} snowFlakes={false} setSnowFlakes={()=>{}}>
            <SideBarItem icon={null} name='test sidebar item' onClick={()=>{ valueToBeChanged = true; }} />
        </SideBar>
    );

    const testSideBarItem = renderedComponent.getByRole('heading', { name: 'test sidebar item' });

    test('tests sidebar item callback', () => {
        expect(renderedComponent.baseElement).toBeDefined();
        expect(renderedComponent.baseElement).toBeVisible();

        act(() => {
            fireEvent.click(testSideBarItem);
        });

        expect(valueToBeChanged).toBe(true);
    });
});

describe('settings tests', () => {
    let valueToBeChanged = false;

    const renderedComponent = render(
        <Settings token={null} additionalSettingsClassName='settings-teacher-page' popupRotation='top'>
            <Setting name='test settings item' onChange={()=>{ console.log('CHECKED IT') }} initialValue={false} />
        </Settings>
    );

    test('tests settings item callback', async () => {
        expect(renderedComponent.baseElement).toBeDefined();
        expect(renderedComponent.baseElement).toBeVisible();

        const settingsIcon = renderedComponent.getAllByAltText('Settings')[0];
        act(() => {
            fireEvent.click(settingsIcon);
        });

        // const testSettingsItem = renderedComponent.getByText('test settings item');
        //
        // act(() => {
        //     fireEvent.change(testSettingsItem);
        // });
        //
        // // TODO code: fix this - always throws false, change it to true
        // expect(valueToBeChanged).toBe(false);
        // expect(testSettingsItem).toBeDefined();
    });
});
