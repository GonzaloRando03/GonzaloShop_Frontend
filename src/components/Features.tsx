import React from "react"

interface FeaturesProps{
    features: any
}

const Features:React.FC<FeaturesProps> = props => {
    return(
        <div className="features">
            {props.features.colors? <span>
                <b>Colores: </b>
                {props.features.colors.toString()}
            </span>:null}
            {props.features.height? <span>
                <b>Altura: </b> {props.features.height}cm
            </span>:null}
            {props.features.width? <span>
                <b>Ancho: </b> {props.features.width}cm
            </span>:null}
            {props.features.length? <span>
                <b>Largo: </b> {props.features.length}cm
            </span>:null}
            {props.features.conectors? <span>
                <b>Conectores: </b> 
                {props.features.conectors.toString()}
            </span>:null}
            {props.features.batery? <span>
                <b>Batería: </b> {props.features.batery}
            </span>:null}
            {props.features.pantalla? <span>
                <b>Pantalla: </b> {props.features.pantalla}"
            </span>:null}
            {props.features.resolucion? <span>
                <b>Resolución: </b> {props.features.resolucion}
            </span>:null}
            {props.features.OS? <span>
                <b>Sistema Operativo: </b> {props.features.OS}
            </span>:null}
            {props.features.RAM? <span>
                <b>Memoria RAM: </b> {props.features.RAM}GB
            </span>:null}
            {props.features.size? <span>
                <b>Tallas: </b> 
                {props.features.size.toString()}
            </span>:null}
            {props.features.material? <span>
                <b>Material: </b> {props.features.material}
            </span>:null}
            {props.features.filtro? <span>
                <b>Filtro: </b> {props.features.filtro}
            </span>:null}
            {props.features.alimentacion? <span>
                <b>Alimentación: </b> {props.features.alimentacion}
            </span>:null}
            {props.features.capacidad? <span>
                <b>Capacidad: </b> {props.features.capacidad}GB
            </span>:null}
        </div>
    )
}

export default Features