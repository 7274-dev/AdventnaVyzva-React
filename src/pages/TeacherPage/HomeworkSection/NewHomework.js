import { useTheme } from '../../../App';
import { MDInput } from '../../../components';
import { LongInput, Modal, ShortInput } from '../../../components';
import { localized } from '../../../hooks/useLocalization';

const NewHomework = ({ token }) => {
    const newHomeworkClassName = useTheme('new-homework');

    return (
        <div className={ newHomeworkClassName }>
            <div style={{width: '90%', height: '40vh'}}>
                <MDInput token={ token }>Test</MDInput>
            </div>

            {/*<div className='header'>*/}
            {/*    <h1>{ data.id }, { data.clazz.name }</h1>*/}
            {/*    <img src={ EditIcon } alt={ localized('cards.edit') } onClick={ edit } className='unselectable' />*/}
            {/*</div>*/}

            {/*<div className='data'>*/}
            {/*    <h1>{ data.title }</h1>*/}
            {/*    <h2 dangerouslySetInnerHTML={{__html: data.text}} />*/}
            {/*    <h1>{ data.fromDate.split('T')[0] }</h1>*/}
            {/*    <h1>{ data.due }</h1>*/}

            {/*    <br />*/}
            {/*</div>*/}

            {/*<Modal active={ isModalActive } finishCallback={ modalCallback }>*/}
            {/*    <ShortInput ref={ modalTitleRef } text={ data.title } />*/}
            {/*    <LongInput ref={ modalTextRef } text={ data.text } />*/}
            {/*</Modal>*/}
        </div>
    )
}

export { NewHomework }
