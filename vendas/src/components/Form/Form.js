import { use, useState } from 'react'
import Input from '../Input/Input'
import './form.css'

function Form() {
    const [produto, setProduto] = useState("")
    const [preco, setPreco] = useState("")
    const [qtd, setQtd] = useState("")

    return (
        <div className='container formCont'>
            <h1>Cadastro de vendas</h1>
            <form onSubmit={(e) => {
                e.preventDefault()
                
                // Verifica se todos os dados foram preenchidos, caso sim, faz a requisição POST
                if(produto !== "" && preco !== "" && qtd !== "") {
                    // Cria o objeto com os dados
                    const data = {
                        produto: produto,
                        preco: preco,
                        qtd: qtd
                    }
                    
                    fetch('http://localhost:9000/vendas', {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: { "Content-type": "application/json" }
                    })
                }

                setProduto("")
                setPreco("")
                setQtd("")

            }} action='/cadastrar' method='post'>
                <Input funcao={(e) => setProduto(e.target.value)} 
                    name='Produto vendido' 
                    id='inputProd' 
                    type='text'
                    placeholder='Ex.: Óleo'
                    value={produto}
                />
                <Input funcao={(e) => setPreco(e.target.value)} 
                    name='Preço' 
                    id='inputPreco' 
                    type='number'
                    placeholder='Ex.: 10,00'
                    value={preco}
                />
                <Input funcao={(e) => setQtd(e.target.value)} 
                    name='Quantidade' 
                    id='inputQtd' 
                    type='number'
                    placeholder='Ex.: 5'
                    value={qtd}
                />
                <Input name='Adicionar venda' 
                    id='inputSubmit' 
                    type='submit' 
                />
            </form>
        </div>
    )
}

export default Form
