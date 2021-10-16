import { useState, useEffect} from 'react';
import { Dropdown } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import '../../../styles/TeacherPage/QueryControls-TeacherPage.css';

const QueryControls = ({ onOrder, onQuery, orderValues }) => {
    const [order, setOrder] = useState(null);
    const [query, setQuery] = useState(null);

    useEffect(() => {
        onOrder(order);
    }, [onOrder, order]);
    useEffect(() => {
        onQuery(query);
    }, [onQuery, query]);

    return (
        <div className='controls'>
            <h1 className='order-by-label'>{ localized('queryControls.orderBy') }:</h1>
            <div className='order-by-dropdown'>
                <Dropdown values={ orderValues } onSelect={ setOrder } initial={ orderValues[0] } />
            </div>

            <h1 className='query-label'>{ localized('queryControls.search') }:</h1>
            <input className='query-input unselectable' placeholder='Jozko Mrkvicka' onChange={ e => { setQuery(e.target.value) } } />
        </div>
    )
}

export { QueryControls }
