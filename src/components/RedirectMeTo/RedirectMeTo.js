import { useState } from 'react';
import { DelayedRedirect } from '../DelayedRedirect';

let redirectMeTo = () => {}

const RedirectContainer = () => {
    const [redirect, setRedirect] = useState(null);

    redirectMeTo = (url, delay = 0, force = false) => {
        if (force) {
            setTimeout(() => {
                window.location = url;
            }, delay);
        }
        else {
            setRedirect(
                <DelayedRedirect to={ url } delay={ delay } />
            );
        }
    }

    return redirect;
}

export { RedirectContainer, redirectMeTo }
