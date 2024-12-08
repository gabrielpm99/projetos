import './input.css'

function Input (props) {
    if(props.type !== 'submit') {
        var step = 1
        if(props.id === "inputPreco") {
            step = 0.01
        }
        
        return (
            <div className='inputCont'>
                <label htmlFor={props.id}>{props.name}<abbr title='Obrigatório'>*</abbr></label>
                <input placeholder={props.placeholder} 
                    onChange={props.funcao} 
                    type={props.type} 
                    id={props.id}
                    step={step}
                    value={props.value}
                    required>
                </input>
            </div>
        )
    } else {
        return (
            <div className='inputCont'>
                <input value={props.name} type={props.type} id={props.id}></input>
            </div>
        )
    }
}

export default Input
