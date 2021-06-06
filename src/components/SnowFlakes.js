/* eslint-disable */
import { useResponsiveValue } from '../hooks/useResponsiveValue';
import { Snowfall, Snowflake } from 'react-snowflakes';
import '../styles/SnowFlakes.css';

const SnowFlakes = () => {
    // TODO: rewrite component without library

    return (
        <div className="snowflakes">
            <Snowfall count={ useResponsiveValue(100, 10, 900) }
                style={{
                    position: 'relative',
                    width: '100vw',
                    height: '100vh'
                }}
                snowflakeFactory={index => {
                    const size = 1; // 50 is the number of snowflakes.
                    const w = 5 + 10 * size + 'px';
                    return (
                        <Snowflake speed={.5 + size * 2}
                            xSpeedPrc={.3 * size}
                            ySpeedPrc={.1 * size}
                            style={{
                                width: w,
                                height: w,
                                borderRadius: '50%',
                                backgroundColor: '#d0d0d0',
                                opacity: .2 + .8 * size,
                                filter: `blur(${Math.round(Math.max(size - .5, 0) * 6)}px)`
                            }}
                        />
                    )
                }} />
        </div>
    )
}

export { SnowFlakes };
