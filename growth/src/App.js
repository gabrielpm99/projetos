import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Treino from './componentes/Treino';
import Header from './componentes/Header'

function App() {

  let [treinos, setTreinos] = useState([]);
  let [treinosFiltrados, setTreinosFiltrados] = useState([]);

  let [dia, setDia] = useState("A");
  
  let [diasDeTreino, setDiasDeTreino] = useState([
    "A", "B", "C", "D", "E"
  ]);

  useEffect(() => 
  {
    (async function () 
  {
    const requisicao = await fetch("./treinos.json");
    const dados = await requisicao.json();

    setTreinos(dados.treinos);
    setTreinosFiltrados(dados.treinos.filter((treino) => treino.dia === "A"))
  })()
  }, [])

  function filtrarTreino (dia, evento) 
  {
    setTreinosFiltrados(treinos.filter((treino) => treino.dia === dia))

    setDia(dia);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header
          dias={diasDeTreino}
          filtrarTreino={filtrarTreino}
        />
        <p className='diaDeTreino'>Treino {dia}</p>
        <ul className='lista-treinos'>
          {treinosFiltrados.map((treino) => <Treino
              chave={treino.nome}
              quantidade={treino.quantidade}
              nome={treino.nome}
              adicional={treino.adicional}
              imagem={treino.imagem}
            />
          )}
        </ul>
      </header>
    </div>
  );
}

export default App;
