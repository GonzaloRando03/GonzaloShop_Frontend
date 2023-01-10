import React from "react";
import { Product } from "../utils/types";
import { QueryResult, useQuery } from "@apollo/client";
import { PRODUCTS_HOME, PRODUCTS_HOME_OFFERT } from "../services/productsQueries";
import Slider from "./Slider";
import imagen from "../img/balon.jpg"
import fondo from "../img/716760.png"
import a from "../img/a.png"
import HomeLoader from "./HomeLoader";





const Products: React.FC = () =>{
    const res: QueryResult<any> = useQuery(PRODUCTS_HOME)

    if (res.loading){
        return <HomeLoader/>
    }

    const products:Product[] = res.data.getProducts

    const column1 = products.slice(0, 4);
    const column2 = products.slice(4);


    return(
        <section className="productsHome">
            <div className="flex">
                {column1.map((p, i) => <div key={i} className="productTable flexCol">
                    <h4>{p.name}</h4>
                    <img src={p.image} alt={p.name}/>
                </div>)}
            </div>
            <div className="flex">
                {column2.map((p, i) => <div key={i} className="productTable flexCol">
                    <h4>{p.name}</h4>
                    <img src={p.image} alt={p.name}/>
                </div>)}
            </div>
        </section>
    )
} 


const Oferts: React.FC = () =>{
    const res: QueryResult<any> = useQuery(PRODUCTS_HOME_OFFERT)

    if (res.loading){
        return <HomeLoader/>
    }

    const products:Product[] = res.data.getProducts

    return(
        <div className="oferts">
            <h2>Ofertas</h2>
            <div className="flex">
                {products.map((p, i) => <div key={i} className="ofert"> 
                    <img src={p.image} alt={p.name}/>
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