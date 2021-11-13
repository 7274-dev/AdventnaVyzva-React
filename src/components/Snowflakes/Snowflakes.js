import { useState, useEffect } from 'react';
import { Snowfall, Snowflake } from 'react-snowflakes';
import { localized } from '../../hooks/useLocalization';
import SnowflakeImageLight1 from '../../images/snowflake1-light.png';
import SnowflakeImageDark1 from '../../images/snowflake1-dark.png';
import SnowflakeImageLight2 from '../../images/snowflake2-light.png';
import SnowflakeImageDark2 from '../../images/snowflake2-dark.png';
import SnowflakeImageLight3 from '../../images/snowflake3-light.png';
import SnowflakeImageDark3 from '../../images/snowflake3-dark.png';
import './SnowFlakes.css';

const SnowflakesLight = ({ snowflakesCount }) => {
    const getRandomSnowflakeImage = () => {
        switch (Math.floor(Math.random() * 3 + 1)) {
            case 1:
                return SnowflakeImageLight1;
            case 2:
                return SnowflakeImageLight2;
            case 3:
                return SnowflakeImageLight3;
            default:
                return null;
        }
    }

    return (
        <Snowfall count={ snowflakesCount }
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh'
            }}
            snowflakeFactory={() =>
                <Snowflake speed={ 2.5 } xSpeedPrc={ .3 } ySpeedPrc={ .1 } className='snowflake'>
                    <img src={ getRandomSnowflakeImage() } alt={ localized('snowflakes.alt') } title={ localized('snowflakes.alt') } className='unselectable' />
                </Snowflake>
            }
        />
    )
}

const SnowflakesDark = ({ snowflakesCount }) => {
    const getRandomSnowflakeImage = () => {
        switch (Math.floor(Math.random() * 3 + 1)) {
            case 1:
                return SnowflakeImageDark1;
            case 2:
                return SnowflakeImageDark2;
            case 3:
                return SnowflakeImageDark3;
            default:
                return null;
        }
    }

    return (
        <Snowfall count={ snowflakesCount }
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh'
            }}
            snowflakeFactory={() =>
                <Snowflake speed={ 2.5 } xSpeedPrc={ .3 } ySpeedPrc={ .1 } className='snowflake'>
                    <img src={ getRandomSnowflakeImage() } alt={ localized('snowflakes.alt') } title={ localized('snowflakes.alt') } className='unselectable' />
                </Snowflake>
            }
        />
    )
}

const Snowflakes = ({ snowflakes, snowflakesCount, darkMode }) => {
    // TODO graphic: make snowflakes for white mode

    const [currentOpacity, setCurrentOpacity] = useState(snowflakes ? 1 : 0);
    const [currentIntervalID, setCurrentIntervalID] = useState(0);

    // snowflake opacity animation
    useEffect(() => {
        if (currentIntervalID) {
            clearInterval(currentIntervalID);
        }

        // animation
        let id, opacity = snowflakes ? 0 : 1;

        const frame = () => {
            if (opacity <= snowflakes ? 1 : 0) {
                clearInterval(id);
                setCurrentOpacity(snowflakes ? 1 : 0);
                return;
            }

            if (currentIntervalID !== id && currentIntervalID > id) {
                clearInterval(id);
            }

            opacity += snowflakes ? .1 : -.1;
            setCurrentOpacity(opacity);
        }

        id = setInterval(frame, 50);
        setCurrentIntervalID(id);
    }, [snowflakes /* dont add any more variables or it will not work (Streamer272) */]);

    return (
        <div className='snowflakes' style={{opacity: currentOpacity}}>
            { darkMode ? <SnowflakesDark snowflakesCount={ snowflakesCount } /> : <SnowflakesLight snowflakesCount={ snowflakesCount } /> }
        </div>
    )
}

export { Snowflakes }
