import { useState, useEffect, useRef } from 'react';
import { useResponsiveValue } from '../hooks/useResponsiveValue';
import { useTheme } from '../App';
import { Snowfall, Snowflake } from 'react-snowflakes';
import '../styles/SnowFlakes.css';

// so, what do we do with the snowflakes?
// do we rewrite the lib or not?

const SnowFlake2 = () => {
    const [speed, setSpeed] = useState(5);
    const [marginLeft, setMarginLeft] = useState(0);
    const [marginRight, setMarginRight] = useState(0);
    const snowflakeDiv = useRef();

    useEffect(() => {
        // eslint-disable-next-line
        setMarginLeft(Math.floor(Math.random() * (screen.width + 1)));

        setInterval(() => {
            Math.random()
        }, 200);
    }, []);

    useEffect(() => {
        snowflakeDiv.current.style.marginLeft = `${marginLeft}px`;
    }, [marginLeft]);

    useEffect(() => {
        snowflakeDiv.current.style.marginLeft = `${marginRight}px`;
    }, [marginRight]);

    return (
        <div ref={ snowflakeDiv } />
    )
}

const SnowFlakes = ({ darkMode }) => {
    // TODO code: rewrite component without library
    // TODO design: fix snowflakes colors
    // TODO code: fix snowflakes color switching between themes

    const snowFlakeCount = useResponsiveValue(100, 10);
    const snowFlakesClassName = useTheme('snowflakes');
    const snowFlakesColor = darkMode ? '#ffffff' : '#000000';

    return (
        <div className={ snowFlakesClassName }>
            <Snowfall count={ snowFlakeCount }
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh'
                }}
                snowflakeFactory={ index => {
                    // TODO code, graphics: add snowflake image in every snowflake
                    return (
                        <Snowflake speed={ 2.5 }
                            xSpeedPrc={ .3 }
                            ySpeedPrc={ .1 }
                            style={{
                                width: '15px',
                                height: '15px',
                                borderRadius: '50%',
                                backgroundColor: snowFlakesColor,
                                opacity: 1,
                                filter: `blur(${ Math.round(Math.max(.3, 0) * 6) }px)`
                            }}
                        />
                    )
                } } />
        </div>
    )
}

export { SnowFlakes };
