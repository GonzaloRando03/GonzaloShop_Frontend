import React from "react";
import { Product } from "../utils/types";
import { HomeLoader } from "./Loaders";
import { QueryResult, useQuery } from "@apollo/client";
import { PRODUCTS_HOME, PRODUCTS_HOME_OFFERT } from "../services/productsQueries";
import Slider from "./Slider";
import fondo from "../img/716760.png"
import a from "../img/a.png"
import { Link } from "react-router-dom";



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
                {column1.map((p, i) => <Link to={`/product/${p.id}`} key={i} className="productTable flexCol noLink">
                    <h4>{p.name}</h4>
                    <img src={p.image} alt={p.name}/>
                </Link>)}
            </div>
            <div className="flex">
                {column2.map((p, i) => <Link to={`/product/${p.id}`} key={i} className="productTable flexCol noLink">
                    <h4>{p.name}</h4>
                    <img src={p.image} alt={p.name}/>
                </Link>)}
            </div>
        </section>
    )
} 


const Offerts: React.FC = () =>{
    const res: QueryResult<any> = useQuery(PRODUCTS_HOME_OFFERT)

    if (res.loading){
        return <HomeLoader/>
    }

    const products:Product[] = res.data.getProducts.slice(0, 6);

    return(
        <div className="oferts">
            <h2>Ofertas</h2>
            <div className="flex">
                {products.map((p, i) => <Link to={`/product/${p.id}`} key={i} className="ofert noLink"> 
                    <img src={p.image} alt={p.name}/>
                </Link>)}
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
                <Link to={'/products'} className="productsLink">
                    <h3>Echa un vistazo a todos nuestros productos</h3>
                </Link>
            </section>
            <section className="center">
                <Offerts/>
            </section>

            
        </div>
    )
} 

export default Home