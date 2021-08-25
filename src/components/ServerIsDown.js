import { useEffect } from 'react';
import { SomethingWentWrong } from './SomethingWentWrong';

const ServerIsDown = () => {
    // TODO code: finish my implementation

    return (
        <SomethingWentWrong
            h1Text='Oh no! Looks like server is down...'
            h2Text={['Please wait unit the server is back online, or contact us on:', ]}
            h2MarginTop='-.5rem'
        />
    )
}

export { ServerIsDown };
