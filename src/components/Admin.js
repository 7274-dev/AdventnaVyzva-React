import { useState } from 'react';
import '../styles/Admin.css';

const Admin = () => {
    // TODO code: finish this page (no need dark mode)

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (!isLoggedIn) {
        return (
            <div>
                <h1>Please enter password: </h1>
                { /* TODO code: password authentication */ }
            </div>
        )
    }

    return (
        <div>
            <h1>Admin btw</h1>
        </div>
    )
}

export { Admin };
