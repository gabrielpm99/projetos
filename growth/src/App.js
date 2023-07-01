import logo from './logo.svg';
import './App.css';
import Treino from './componentes/Treino';
import { useEffect, useState } from 'react';
import DiaDeTreino from './componentes/DiaDeTreino';
import Header from './componentes/Header'

function App() {

  let [treinos, setTreinos] = useState([]);

  useEffect(() => 
  {
    (async function () 
  {
    const requisicao = await fetch("./treinos.json");
    const dados = await requisicao.json();

    setTreinos(dados.treinos);
  })()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <ul className='lista-treinos'>
          {treinos.map((treino) => <DiaDeTreino
            key={treino.nome}
            dia={treino.dia}
            quantidade={treino.quantidade}
            nome={treino.nome}
            adicional={treino.adicional}
            imagem={treino.imagem}
          />)}
        </ul>
      </header>
    </div>
  );
}

export default App;
