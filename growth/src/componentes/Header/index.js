import './header.css';
import NavbarAnchor from './../NavbarAnchor'
import { v4 as uuidv4 } from 'uuid';

function Header ({ dias, filtrarTreino }) 
{
    return (
        <header className='header'>
            <ul className='navbar'>
                {dias.map((dia) => <NavbarAnchor
                    key={uuidv4()}
                    diaDeTreino={dia}
                    filtrarTreino={filtrarTreino}
                />)}
            </ul>
        </header>
    )
}

export default Header;
