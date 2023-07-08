import './navbar.css';

function NavbarAnchor ({ diaDeTreino, filtrarTreino }) 
{
    return (
        <li className='navbar-item'><a onClick={(e) => filtrarTreino(diaDeTreino, e)}>Treino {diaDeTreino}</a></li>
    )
}

export default NavbarAnchor;
