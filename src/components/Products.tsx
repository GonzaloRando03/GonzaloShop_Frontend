import React, { useEffect, useState } from 'react';
import { Product, ProductProp, FormEvent } from "../utils/types";
import { useLazyQuery } from "@apollo/client";
import { PRODUCTS_SEARCH } from "../services/productsQueries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router';
import { toastError } from '../utils/toast';
import LateralPanel from './LateralPanelProducts';
import { ProductsLoader } from './Loaders';
import { Link } from 'react-router-dom';
import Stars from './Stars';


const ProductOne:React.FC<ProductProp> = ({ product }) => <Link to={`/product/${product.id}`} className="productSearhed">
    <div className="center image">
        <img src={product.image} alt={product.name}/>
    </div>
    <div className="text-center">
        <h4>{product.brand}</h4>
        <p>{product.name}</p>
        <div className='center'>
            {product.hasOwnProperty('stars')
                ?<Stars number={product.stars}/>
                :null
            }
        </div>
        <h2>{product.price}€</h2>
    </div>
</Link>



const Products:React.FC = () => {

    const [radio, setRadio] = useState<boolean>(false)
    const [category, setCategory] = useState<string>("Todas las categorías")
    const [order, setOrder] = useState<string>("")
    const [maxPrice, setMaxPrice] = useState<number>(100000)
    const [minPrice, setMinPrice] = useState<number>(0)

    const [getProducts, result] = useLazyQuery(PRODUCTS_SEARCH) 
    const [products, setProducts] = useState<Product[]>([])
    const {search} = useParams()
    

    //Effect para hacer la query
    useEffect(() => {
        getProducts({variables: {
            search: search, 
            price: [maxPrice, minPrice], 
            category:category, 
            order:order
        }})
    }, [])

    //Effect para actualizar los datos cuando el result cambie
    useEffect(() => {
        if (result.data){
            setProducts(result.data.getProducts)
        }
    }, [result])

    //Effect para recargar la página con cada búsqueda
    useEffect(() => {  
        if(result.data){
            getProducts({variables: {
                search: search, 
                price: [maxPrice, minPrice], 
                category:category, 
                order:order
            }})
        }
    }, [search])

    //Effecto para error en la búsqueda
    useEffect(()=>{
        setRadio(false)
        setCategory("Todas las categorías")
        setOrder("")
        setMaxPrice(1000000)
        setMinPrice(0)
        const productOne = {...products[0]}
        if (productOne.hasOwnProperty('error')) {
            toastError('No hay productos que coincidan con tu búsqueda')
            getProducts({variables: {search: ""}})
        }
    }, [products])


    if(result.loading){
        return(
            <div>
              <LateralPanel handleSubmit={null} setCategory={null} 
                            setMaxPrice={null} setMinPrice={null} 
                            setOrder={null} setRadio={null} radio={false}
                            handleSale={null}/>
                <ProductsLoader/>
            </div>
        )
    }

    
    function handleSale(event:FormEvent){
        event.preventDefault()
        setRadio(!radio)
    }


    function handleSubmitFilters(event:SubmitEvent){
        event.preventDefault()    
        if(radio){
            getProducts({variables: {sale: true}})

        }else{
            const variables = {
                search: search, 
                price: [maxPrice, minPrice], 
                category:category, 
                order:order, 
                
            }
            getProducts({variables: variables})
        }
    }


    return (
        <div className='mb-15'>
            <LateralPanel   handleSubmit={handleSubmitFilters} setCategory={setCategory} 
                            setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} 
                            setOrder={setOrder} setRadio={setRadio} radio={radio}
                            handleSale={handleSale}/>
            <section className="productsResults">
                {products.map((p:Product, i) => <ProductOne key={i} product={p}/>)}
            </section>
        </div>
    );
}

export default Products;
