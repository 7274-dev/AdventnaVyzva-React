import { SomethingWentWrong } from './SomethingWentWrong';
import { localized } from '../hooks/useLocalization';

const ServerIsDown = () => {
    return (
        <SomethingWentWrong
            h1Text={ localized('servers.down.1') }
            h2Text={[localized('servers.down.2'), ]}
            h2MarginTop='-.5rem'
        />
    )
}

export { ServerIsDown };
