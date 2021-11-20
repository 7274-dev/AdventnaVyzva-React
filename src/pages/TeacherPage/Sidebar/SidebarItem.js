import { useTheme } from '../../../App';

const SidebarItem = ({ icon, name, onClick }) => {
    const sideBarItemClassName = useTheme('sidebar-item');
    const nameClassName = useTheme('name');

    return (
        <div onClick={() => onClick()} className={ sideBarItemClassName }>
            <div className='icon'>
                { icon }
            </div>

            <h1 className={ nameClassName }>{ name }</h1>
        </div>
    )
}

export {
    SidebarItem
}
