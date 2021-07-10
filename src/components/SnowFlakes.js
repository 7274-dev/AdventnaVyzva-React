import { useResponsiveValue } from '../hooks/useResponsiveValue';
import { Snowfall, Snowflake } from 'react-snowflakes';
import SnowFlake from '../images/snowflake.png';
import '../styles/SnowFlakes.css';

const SnowFlakes = () => {
    // TODO code, design: make turn on/off smoother

    const snowFlakeCount = useResponsiveValue(200, 20);

    return (
        <div className='snowflakes'>
            <Snowfall count={ snowFlakeCount }
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh'
                }}
                snowflakeFactory={ index => {
                    // TODO graphics: change snowflake image
                    return (
                        <Snowflake speed={ 2.5 } xSpeedPrc={ .3 } ySpeedPrc={ .1 } className='snowflake'>
                            <img alt='Snowflake' src={ SnowFlake } />
                        </Snowflake>
                    )
                } } />
        </div>
    )
}

export { SnowFlakes };
