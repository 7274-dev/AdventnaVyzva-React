import { useState, useEffect, useRef } from "react";
import { useResponsiveValue } from '../hooks/useResponsiveValue';
import { useTheme } from "../App";
import { Snowfall, Snowflake } from 'react-snowflakes';
import '../styles/SnowFlakes.css';

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
        }, 1000);
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

const SnowFlakes = () => {
    // TODO code: rewrite component without library
    // TODO design: fix snowflakes colors

    const snowFlakeCount = useResponsiveValue(100, 10);
    const snowFlakesClassName = useTheme("snowflakes");

    return (
        <div className={ snowFlakesClassName }>
            <Snowfall count={ snowFlakeCount }
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh'
                }}
                snowflakeFactory={ index => {
                    const size = 1;
                    const width = 5 + 10 * size + 'px';

                    return (
                        <Snowflake speed={.5 + size * 2}
                            xSpeedPrc={.3 * size}
                            ySpeedPrc={.1 * size}
                            style={{
                            width: width,
                            height: width,
                            borderRadius: '50%',
                            backgroundColor: '#000000',
                            opacity: .2 + .8 * size,
                            filter: `blur(${Math.round(Math.max(size - .7, 0) * 6)}px)`
                        }}
                        />
                    )
                } } />
        </div>
    )
}

export { SnowFlakes };
