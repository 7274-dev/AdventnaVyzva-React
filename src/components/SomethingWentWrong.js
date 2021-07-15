import { useTheme } from '../App';
import '../styles/SomethingWentWrong.css';

const SomethingWentWrong = () => {
    const somethingWentWrongClassName = useTheme('something-went-wrong');

    return (
        <div className={ somethingWentWrongClassName }>
            <h1>Oh no! Something went wrong...</h1>
            <h2>Try restarting the page, if the problem remains, please contact us on:</h2>
            <h2 className='email'>seven.two.seven.four.dev@gmail.com</h2>
        </div>
    )
}

export { SomethingWentWrong };
