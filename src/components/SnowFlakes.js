import { Snowfall, Snowflake } from 'react-snowflakes';
import '../styles/SnowFlakes.css';

const SnowFlakes = () => {
    return (
        <div className="snowflakes">
            <Snowfall count={ 150 }
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
                                backgroundColor: 'white',
                                opacity: .2 + .8 * size,
                                filter: `blur(${Math.round(Math.max(size - .5, 0) * 6)}px)`
                            }} />
                    )
                }} />
        </div>
    )
}

export { SnowFlakes };
