import './header.css';
import NavbarAnchor from './../NavbarAnchor'

function Header () 
{
    return (
        <header className='header'>
            <ul className='navbar'>
                <NavbarAnchor/>
            </ul>
        </header>
    )
}

export default Header;
