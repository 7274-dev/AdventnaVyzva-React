import { render } from '@testing-library/react';
import { Home } from "./components/Home";
import { StudentsPage } from "./components/StudentsPage";
import { TeacherPage } from "./components/TeacherPage";
import { Login } from "./components/Login";
import { _404 } from "./components/404";
import { About } from "./components/About";
import { DelayedRedirect } from "./components/DelayedRedirect";
import { Settings } from "./components/Settings";
import { SnowFlakes } from "./components/SnowFlakes";


// run all tests with `yarn test`
test('home page', () => {
  render(<Home token={null} getClassNameByTheme={()=>{}} darkMode={false} setDarkMode={()=>{}} />);
});
test('students page', () => {
    render(<StudentsPage token={null} getClassNameByTheme={()=>{}} darkMode={false} setDarkMode={()=>{}} />);
});
test('teacher page', () => {
  render(<TeacherPage />);
});
test('login page', () => {
  render(<Login setToken={()=>{}} darkMode={false} getClassNameByTheme={()=>{}} />);
});
test('404 page', () => {
  render(<_404 getClassNameByTheme={()=>{}} />);
});
test('about page', () => {
  render(<About />);
});
test('delayed redirect component', () => {
  render(<DelayedRedirect delay={150} to={'/'} />);
});
test('settings component', () => {
  render(<Settings settings={[]} getClassNameByTheme={()=>{}} token={null} />);
});
test('snowflakes component', () => {
  render(<SnowFlakes />);
});
