import { useTheme } from '../App';
import '../styles/SomethingWentWrong.css';

const SomethingWentWrong = ({ h1FontSize = '4rem', h2FontSize = '2.5rem', h2MarginTop = '0.5rem', emailMarginTop = '-1.5rem' }) => {
    const somethingWentWrongClassName = useTheme('something-went-wrong');

    return (
        <div className={ somethingWentWrongClassName }>
            <h1 style={{fontSize: h1FontSize}}>Oh no! Something went wrong...</h1>
            <h2 style={{fontSize: h2FontSize, marginTop: h2MarginTop}}>Try restarting the page, if the problem remains, please contact us on:</h2>
            <h2 className='email' style={{fontSize: h2FontSize, marginTop: emailMarginTop}}>seven.two.seven.four.dev@gmail.com</h2>
        </div>
    )
}

export { SomethingWentWrong };
