import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
// shouldn't this path be just react-router-dom ??
// like in App.js ??

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
