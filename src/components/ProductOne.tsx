import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GET_ONE_PRODUCT } from "../services/productsQueries";
import { toastError } from "../utils/toast";
import { Product, Valoration } from "../utils/types";
import Features from "./Features";
import { ProductsLoader } from "./Loaders";
import Stars from "./Stars";



interface ValorationsProps{
    valorations: Valoration[]
}

const Valorations:React.FC<ValorationsProps> = props =>{
    return(<div className="productOneValorations">
        <h3>Valoraciones</h3>
        {props.valorations.map((v,i) => <div key={i}>
            <h4 className="flex">{v.username} &nbsp; <Stars number={v.stars}/></h4>
            <div className="mb-5"><span>{v.text}</span></div>
        </div>)}
    </div>)
}


const ProductOne:React.FC = () => {
    const [getProduct, result] = useLazyQuery(GET_ONE_PRODUCT) 
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [product, setProduct] = useState<Product>({
        id: "",
        name: "",
        images:[],
        stars:0,
        image:""
    })
    const {name} = useParams()
    
    //Effect para hacer la query
    useEffect(() => {
        getProduct({variables: {
            id: name
        }})
    }, [])

    //Effect para actualizar los datos cuando el result cambie
    useEffect(() => {
        console.log(result)
        if (result.data){
            setProduct(result.data.getProductOne)
        }
    }, [result])

    //Effecto para error en la búsqueda
    useEffect(()=>{
        const productOne = {...product}
        if (productOne.hasOwnProperty('error')) {
            toastError('No hay productos que coincidan con tu búsqueda')
            getProduct({variables: {search: ""}})
        }
    }, [product])

    //Effect para recargar la página con cada búsqueda
    useEffect(() => {  
        console.log(name)
        if(result.data){
            getProduct({variables: {
                id: name
            }})
        }
    }, [name])



    if(result.loading){
        return (
            <div>
                <ProductsLoader/>
            </div>
        )
    }


    return (
        <div className="flex">
            <div className="miniImagesDiv mt7">
                {product.images.map((img, i) => <div onClick={()=>setImageIndex(i)} className="miniImage" key={i}>
                    <img src={img} alt="producto"/>
                </div>)}
            </div>
            <div  className="contentProduct mt7">
                <div className="principImage">
                    <img src={product.images[imageIndex]} alt="producto"/>
                </div>
                <div className="productData flexCol">
                    <h3>{product.name}</h3>
                    <div className="lineDown">
                        <div className="flex">
                            <Stars number={product.stars}/> 
                            <span className="ml1">{product.valorations?.length} valoraciones</span>
                        </div>
                        <span className="productPrice">{product.price}€</span>
                    </div>
                    <p>
                        <b>Descripción: </b> {product.description}
                    </p>
                    <p>
                        <b>Marca: </b>{product.brand}
                    </p>
                    <Features features={product.features
                        ?product.features
                        :{}}/>
                    <button className="buy">Comprar ahora</button><br/>
                    <button className="addValoration">Añadir valoración</button>
                    
                    <Valorations valorations={product.valorations
                        ?product.valorations
                        :[]}/>
                </div>
            </div>
        </div>
    );
}


export default ProductOne