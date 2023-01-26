import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GET_ONE_PRODUCT } from "../services/productsQueries";
import { toastError, toastInfo } from "../utils/toast";
import { Product, Valoration } from "../utils/types";
import Features from "./Features";
import { ProductsLoader } from "./Loaders";
import { ValorationForm, Valorations } from "./ProductValoration";
import Stars from "./Stars";



const ProductOne:React.FC = () => {
    const [getProduct, result] = useLazyQuery(GET_ONE_PRODUCT) 
    const [imageIndex, setImageIndex] = useState<number>(0)
    const [valorations, setValorations] = useState<Valoration[]>([])
    const [enableValorationForm, setValorationForm] = useState<boolean>(false)
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
            setValorations(result.data.getProductOne.valorations)
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


    function addToCart(){
        let userStorage:any = window.localStorage.getItem('user')
        if (userStorage === null){
            toastError('Necesitas estar logueado para comprar.')
            return null
        }
        let cartStorage:any = window.localStorage.getItem('cart')
        let cartJSON:any = JSON.parse(cartStorage)
        let counter = 0

        cartJSON.forEach((e:any) => {
            if (e.name === product.name){
                counter++
                e.price+=(e.price/e.cantidad)
                e.price = parseFloat(e.price)
                e.cantidad++
                window.localStorage.setItem('cart', JSON.stringify(cartJSON))
                return null
            }
        })

        if(counter === 0){
            cartJSON.push({
                name: product.name,
                price: product.price,
                cantidad: 1,
                image: product.images[0]
            })
            window.localStorage.setItem('cart', JSON.stringify(cartJSON))
        }
        toastInfo('Producto añadido con éxito.')
    }

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
                    <button className="buy"
                            onClick={()=>addToCart()}>Añadir al carrito</button><br/>
                    <button className="addValoration"
                        onClick={
                            ()=>setValorationForm(!enableValorationForm)
                    }>{
                        enableValorationForm? "Cancelar valoración":"Añadir valoración"
                    }</button>
                    {
                        enableValorationForm
                            ?<ValorationForm name={product.id} 
                                             setValorations={setValorations}
                                             setValorationForm={setValorationForm} 
                                             valorations={valorations?valorations:[]}/>
                            :null
                    }
                    <Valorations valorations={valorations
                        ?valorations
                        :[]}/>
                </div>
            </div>
        </div>
    );
}


export default ProductOne