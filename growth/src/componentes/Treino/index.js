import './treino.css';
import { AiOutlineArrowRight } from 'react-icons/ai';

function Treino ({ chave, nome, quantidade, adicional, imagem }) 
{
    console.log(chave)
    return (
        <li key={chave} className="card-treino">
            <h3>{nome}</h3>
            <img src={imagem}/>
            <h4>{quantidade}</h4>
            <p>{adicional}</p>
        </li>
    )
}

export default Treino;