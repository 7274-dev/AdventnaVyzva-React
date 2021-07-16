import { useState, useEffect} from 'react';
import { Dropdown } from '../Dropdown';
import '../../styles/TeacherPage/QueryControls-TeacherPage.css';

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
            <h1 className='order-by-label'>Order by: </h1>
            <div className='order-by-dropdown'>
                <Dropdown values={ orderValues } onSelect={ setOrder } initial={ orderValues[0] } />
            </div>

            <h1 className='query-label'>Query by: </h1>
            <input className='query-input unselectable' placeholder='AlbertEinstein69' onChange={ (e) => { setQuery(e.target.value) } } />
        </div>
    )
}

export { QueryControls };
