import { useState, useEffect } from 'react';
import { useResponsiveValue } from '../hooks/useResponsiveValue';
import { Snowfall, Snowflake } from 'react-snowflakes';
import SnowFlake from '../images/snowflake.png';
import '../styles/SnowFlakes.css';

const SnowFlakes = ({ snowflakes }) => {
    // TODO code: fix snowflakes not showing on teacher page

    const [currentOpacity, setCurrentOpacity] = useState(snowflakes ? 1 : 0);
    const [currentIntervalID, setCurrentIntervalID] = useState(undefined);
    const snowFlakeCount = useResponsiveValue(200, 20);

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
    }, [snowflakes]);

    return (
        <div className='snowflakes' style={{opacity: currentOpacity}}>
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
                            <img alt='Snowflake' src={ SnowFlake } className='unselectable' />
                        </Snowflake>
                    )
                } } />
        </div>
    )
}

export { SnowFlakes };
