import { useState, useEffect, useRef } from 'react';
import { useResponsiveValue } from '../hooks/useResponsiveValue';
import { Snowfall, Snowflake } from 'react-snowflakes';
import SnowFlake from '../images/snowflake.png';
import '../styles/SnowFlakes.css';

const SnowFlakes = ({ snowFlakes }) => {
    const [currentOpacity, setCurrentOpacity] = useState(snowFlakes ? 1 : 0);
    const [isSnowFlakeOpacityAnimationRunning, setIsSnowFlakeOpacityAnimationRunning] = useState(false);
    const snowFlakeCount = useResponsiveValue(200, 20);
    const divRef = useRef();

    // snowflake opacity animation
    useEffect(() => {
        // TODO code: fix snowflakes sometimes don't end up with right state

        // so both animations don't run at the same time
        setIsSnowFlakeOpacityAnimationRunning(true);

        // animation
        let id, opacity = snowFlakes ? 0 : 1;

        const frame = () => {
            if (opacity <= snowFlakes ? 1 : 0 || isSnowFlakeOpacityAnimationRunning) {
                clearInterval(id);
                setCurrentOpacity(snowFlakes ? 1 : 0);
                setIsSnowFlakeOpacityAnimationRunning(false);
                return;
            }

            opacity += snowFlakes ? .1 : -.1;
            setCurrentOpacity(opacity);
        }

        id = setInterval(frame, 50);
    }, [snowFlakes]);

    return (
        <div className='snowflakes' ref={ divRef } style={{opacity: currentOpacity}}>
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
