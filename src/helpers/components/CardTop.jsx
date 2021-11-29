import '../../App.css';

function CardTop({title, id, idRef, nome, subtitle, quant}){
    return(
        <div class="card">
            <h4><b>{title}</b></h4>
            <p>Id interno: {id}</p>
            <p>Id externo: {idRef}</p>
            <p>{nome}</p>
            <p><b>{subtitle}</b></p>
            <p>{quant}</p>
        </div>
    )
}

export default CardTop;