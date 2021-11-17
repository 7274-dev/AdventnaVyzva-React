import { useEffect } from 'react';
import { SomethingWentWrong } from '../../../components';
import { redirectMeTo } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';

const ServerIsDown = () => {
    useEffect(() => {
        const id = setInterval(async () => {
            try {
                await Api.utils.test();

                clearInterval(id);
                redirectMeTo('/');
            }
            catch (err) {}
        }, 2000);
    }, []);

    return (
        <SomethingWentWrong
            h1Text={ localized('serverIsDown.title') }
            h2Text={ localized('serverIsDown.text') }
            h2MarginTop='-.5rem'
        />
    )
}

export { ServerIsDown }
