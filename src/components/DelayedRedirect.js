import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const DelayedRedirect = ({ delay, ...props }) => {
    const [timeToRedirect, setTimeToRedirect] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setTimeToRedirect(true);
        }, delay);
    }, [delay]);

    if (timeToRedirect) {
        return <Redirect {...props} />
    }

    return null;
}

export { DelayedRedirect };
