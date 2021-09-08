import { useState, useEffect } from 'react';
import { Snowfall, Snowflake } from 'react-snowflakes';
import { localized } from '../hooks/useLocalization';
import SnowflakeImage1 from '../images/snowflake1.png';
import SnowflakeImage2 from '../images/snowflake2.png';
import SnowflakeImage3 from '../images/snowflake3.png';
import '../styles/SnowFlakes.css';

const Snowlakes = ({ snowflakes, snowflakesCount }) => {
    // TODO graphic: make snowflakes for white mode

    const [currentOpacity, setCurrentOpacity] = useState(snowflakes ? 1 : 0);
    const [currentIntervalID, setCurrentIntervalID] = useState(undefined);

    // snowflake opacity animation
    useEffect(() => {
        if (currentIntervalID !== undefined) {
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
    // dont add any more dependencies or it will not work (by Streamer272)
    }, [snowflakes]);

    const getRandomSnowflakeImage = () => {
        const rand = Math.floor(Math.random() * 3 + 1);
        if (rand === 1) return SnowflakeImage1;
        if (rand === 2) return SnowflakeImage2;
        if (rand === 3) return SnowflakeImage3;
        return null;
    }

    return (
        <div className='snowflakes' style={{opacity: currentOpacity}}>
            <Snowfall count={ snowflakesCount }
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh'
                }}
                snowflakeFactory={index =>
                        <Snowflake speed={ 2.5 } xSpeedPrc={ .3 } ySpeedPrc={ .1 } className='snowflake'>
                            <img alt={ localized('snowflake') } src={ getRandomSnowflakeImage() } className='unselectable' />
                        </Snowflake>
                } />
        </div>
    )
}

export { Snowlakes };
