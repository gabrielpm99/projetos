import './treino.css';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Treino ({ nome, quantidade, adicional, imagem }) 
{
    return (
        <li className="card-treino">
            <h3>{nome}</h3>
            <img src={imagem}/>
            <h4>{quantidade}</h4>
            <p>{adicional}</p>
        </li>
    )
}

export default Treino;