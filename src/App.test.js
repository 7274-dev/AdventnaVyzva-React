// TODO code: add proper tests

import { render, fireEvent, act } from '@testing-library/react';  // this is library u dumbass
import { StudentsPage } from './components/StudentsPage';
import { TeacherPage } from './components/TeacherPage';
import { Login } from './components/Login';  // done
import { NotFoundPage } from './components/NotFoundPage';  // done
import { About } from './components/About';  // no need
import { DelayedRedirect } from './components/DelayedRedirect';  // no need
import { Settings, Setting } from './components/Settings';
import { SnowFlakes } from './components/SnowFlakes';  // done
import { Loading } from './components/Loading';  // no need
import { SideBar, SideBarItem } from "./components/SideBar";  // done

// run all tests with `yarn test`

describe('syntax tests', () => {
    test('students page', () => {
        render(
            <StudentsPage token={null} darkMode={false} setDarkMode={()=>{}} />
        );
    });

    test('teacher page', () => {
        render(
            <TeacherPage />
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

    test('about page', () => {
        render(
            <About />
        );
    });

    test('delayed redirect component', () => {
        render(
            <DelayedRedirect delay={ 1000 } to="/" />
        );
    });

    test('settings component', () => {
        render(
            <Settings token={null}><Setting name="setting" onChange={()=>{}} initialValue={false} />
                <Setting name="test" initialValue={false} onChange={()=>{}} />
            </Settings>
        );
    });

    test('snowflakes component', () => {
        render(
            <SnowFlakes />
        );
    });

    test('loading component', () => {
        render(
            <Loading />
        );
    });

    test('sidebar component', () => {
        render(
            <SideBar token={null} darkMode={false} setDarkMode={()=>{}} snowFlakes={false} setSnowFlakes={()=>{}}>
                <SideBarItem icon={<h1>ico</h1>} name="name" onClick={()=>{}} />
            </SideBar>
        )
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
        expect(message.innerHTML).toBe("We couldn't reach our servers, make sure you are connected to internet and try again.");
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
        <SnowFlakes />
    );

    test('tests component visibility', () => {
        expect(renderedComponent.baseElement).toBeDefined();
        expect(renderedComponent.baseElement).toBeVisible();
    });
});

describe('sidebar tests', () => {
    let valueToBeChanged = false;

    const renderedComponent = render(
        <SideBar token={null} darkMode={false} setDarkMode={()=>{}} snowFlakes={false} setSnowFlakes={()=>{}}>
            <SideBarItem icon={null} name="test sidebar item" onClick={()=>{ valueToBeChanged = true; }} />
        </SideBar>
    );

    const testSideBarItem = renderedComponent.getByRole('heading', { name: 'test sidebar item' });

    test('tests sidebar item callback', () => {
        expect(renderedComponent.baseElement).toBeDefined();
        expect(renderedComponent.baseElement).toBeVisible();

        fireEvent.click(testSideBarItem);

        // TODO code: test doesn't pass no matter what - fix
        expect(valueToBeChanged).toBe(true);
    });
});
