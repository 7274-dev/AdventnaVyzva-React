import { useResponsiveValue } from '../hooks/useResponsiveValue';
import { Snowfall, Snowflake } from 'react-snowflakes';
import SnowFlake from '../images/snowflake.png';
import '../styles/SnowFlakes.css';

const SnowFlakes = () => {
    // TODO code: fix snowflakes color switching between themes

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
                    // TODO graphics: make snowflake image
                    return (
                        <Snowflake speed={ 2.5 }
                                   xSpeedPrc={ .3 }
                                   ySpeedPrc={ .1 }
                                   style={{
                                       overflow: 'hidden',
                                       backgroundColor: '#ADD8E6',
                                       opacity: 1,
                                       pointerEvents: 'none',
                                       background: 'none !important'
                                   }} >
                            <img alt='Snowflake' src={ SnowFlake } style={{
                                height: '8px',
                                width: '8px'
                            }} />
                        </Snowflake>
                    )
                } } />
        </div>
    )
}

export { SnowFlakes };
