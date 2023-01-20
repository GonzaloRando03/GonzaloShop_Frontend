import React, { useState } from "react";
import Stars from "./Stars";
import { Valoration } from "../utils/types";
import { useLazyQuery } from "@apollo/client";
import { ADD_VALORATION } from "../services/productsQueries";

interface ValorationsProps{
    valorations: Valoration[]
}

export const Valorations:React.FC<ValorationsProps> = props =>{
    return(<div className="productOneValorations">
        <h3>Valoraciones</h3>
        {props.valorations.map((v,i) => <div key={i}>
            <h4 className="flex">{v.username} &nbsp; <Stars number={v.stars}/></h4>
            <div className="mb-5"><span>{v.text}</span></div>
        </div>)}
    </div>)
}


export const ValorationForm:React.FC = () => {
    const [getValoration, result] = useLazyQuery(ADD_VALORATION) 
    const [valorationText, setValorationText] = useState<string>("")
    const [valorationStars, setValorationStars] = useState<number>(5)

    function handleValoration(){
        getValoration({variables: {
//continnuar por aqui maána
        }})
    }

    return(
        <form className="valorationForm">
            <h2>Añade tu valoración</h2>
            <div className="flexCol">
                Escribe lo que opines
                <textarea className="valorationText" value={valorationText} onChange={(e)=>{
                    e.preventDefault()
                    setValorationText(e.target.value)
                }}/>
            </div>
            <div className="flex mt2">
                Selecciona las estrellas
                <select className="valorationStars" value={valorationStars} onChange={(e)=>{
                    e.preventDefault()
                    setValorationStars(parseInt(e.target.value))
                }}>
                    <option>0</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
            <button type="submit" className="sendValoration">Enviar valoración</button>
        </form>
    )
}

