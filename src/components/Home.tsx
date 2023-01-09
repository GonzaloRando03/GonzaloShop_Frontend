import React, { useEffect, useState } from "react";
import imagen from "../img/balon.jpg"
import fondo from "../img/716760.png"
import a from "../img/a.png"
import Slider from "./Slider";
import { Product } from "../utils/types";



const Products: React.FC = () =>{
    const [products, setProducts] = useState<Product[]>([])

    useEffect(()=>{

    },[])

    const productss = [{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'}]
    const column1 = products.slice(0, 4);
    const column2 = products.slice(4);


    return(
        <section className="productsHome">
            <div className="flex">
                {column1.map((p, i) => <div key={i} className="productTable flexCol">
                    <h3>Producto</h3>
                    <img src={p.images[0]} alt="producto"/>
                </div>)}
            </div>
            <div className="flex">
                {column2.map((p, i) => <div key={i} className="productTable flexCol">
                    <h3>Producto</h3>
                    <img src={p.images[0]} alt="producto"/>
                </div>)}
            </div>
        </section>
    )
} 


const Oferts: React.FC = () =>{
    const products = [{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'},{image: imagen, title: 'producto'}]

    return(
        <div className="oferts">
            <h2>Ofertas</h2>
            <div className="flex">
                {products.map((p, i) => <div key={i} className="ofert"> 
                    <img src={p.image} alt={p.title}/>
                    <h3>{p.title}</h3>
                </div>)}
            </div>
        </div>
    )
} 


const Home: React.FC = () =>{
    const imagenes = [fondo, a, fondo, a]

    return(
        <div className="home">
            <section className="center">
                <Slider images={imagenes}/>
            </section>
            <section className="center">
                <Products/>
            </section>
            <section className="center">
                <Oferts/>
            </section>

            
        </div>
    )
} 

export default Home