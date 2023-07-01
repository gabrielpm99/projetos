import Treino from './../Treino';

function DiaDeTreino ({ nome, quantidade, adicional, dia, imagem }) 
{
    return (
        <Treino 
            nome={nome}
            quantidade={quantidade}
            adicional={adicional}
            imagem={imagem}
        />
    )
}

export default DiaDeTreino;
