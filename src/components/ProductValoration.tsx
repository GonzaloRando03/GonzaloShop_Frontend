import React, { useState } from "react";
import Stars from "./Stars";
import { FormEvent, Valoration } from "../utils/types";
import { useMutation } from "@apollo/client";
import { ADD_VALORATION } from "../services/productsQueries";
import { toastError, toastInfo } from "../utils/toast";


interface ValorationsProps{
    valorations: Valoration[]
}

interface ValorationsFormProps{
    name: string
    setValorations: any
    setValorationForm: any
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


export const ValorationForm:React.FC<ValorationsFormProps> = props => {
    const [addValoration] = useMutation(ADD_VALORATION) 
    const [valorationText, setValorationText] = useState<string>("")
    const [valorationStars, setValorationStars] = useState<number>(5)

    function handleValoration(event: FormEvent){
        event.preventDefault()
        
        let userJSON:any = window.localStorage.getItem('user')
        let user:any = JSON.parse(userJSON)

        if (userJSON !== null && valorationStars <= 5){
            addValoration({variables: {
                    name: props.name,
                    username: user.username,
                    text: valorationText,
                    stars: valorationStars
                }
            })
            props.setValorations([...props.valorations, {
                username: user.username, 
                text: valorationText, 
                stars: valorationStars}
            ])
            toastInfo("Valoración añadida correctamente")
            props.setValorationForm(false)

        }else{
            toastError("Necesitas estar registrado para publicar una valoración")
        }
    }

    return(
        <form className="valorationForm" onSubmit={(e)=>handleValoration(e)}>
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

