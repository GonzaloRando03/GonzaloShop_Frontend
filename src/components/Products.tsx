import React, { useEffect, useState } from 'react';
import { Product, ProductProp, FormEvent } from "../utils/types";
import { useLazyQuery } from "@apollo/client";
import { PRODUCTS_SEARCH } from "../services/productsQueries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faStar } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router';
import { toastError } from '../utils/toast';


interface PanelProps{
    handleSubmit: any
    setRadio: any
    setCategory: any
    setOrder: any
    setMaxPrice: any
    setMinPrice: any
    radio: boolean
    handleSale: any
}

const LateralPanel:React.FC<PanelProps> = ({
    handleSubmit, 
    radio, 
    handleSale, 
    setCategory, 
    setOrder, 
    setMaxPrice, 
    setMinPrice

}) =>(<div className="flex">
        <section className="lateralPanel">
        <div className='flex color-primary'>
            <h2>GonzaloShop</h2>
            <FontAwesomeIcon icon={faCartShopping} className='mainIcon'/>
        </div>
        <h1>Filtros</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <button type='submit' className="filterApply">
                Aplicar filtros
            </button>
            <div>
                <h4>Categoría</h4>
                <select className="categorySelect" 
                        onChange={(e)=>{
                            setCategory(e.target.value)
                    }
                }>          
                    <option>Todas las categorías</option>
                    <option>Tecnología</option>
                    <option>Hogar</option>
                    <option>Ropa</option>
                    <option>Complementos</option>
                    <option>Juguetes</option>
                    <option>Cocina</option>
                </select>
            </div>
            <div className="mt6 ">
                <h4>Ordenar por</h4>
                <select className="categorySelect"
                        onChange={(e)=>{
                            setOrder(e.target.value)
                    }
                }>
                    <option>Destacados</option>
                    <option>Precio más bajo</option>
                    <option>Precio más alto</option>
                    <option>Valoración</option>
                </select>
            </div>
            <div className="mt6">
                <h4>Precio</h4>
                <div >
                    Precio mínimo 
                    <input  className="inputPrice" 
                            type="number" 
                            placeholder=" Precio en €" 
                            onChange={(e)=>{setMinPrice(parseInt(e.target.value))}}
                    />
                </div>
                <div className="mt2">
                    Precio máximo 
                    <input  className="inputPrice mt1" 
                            type="number" 
                            placeholder=" Precio en €" 
                            onChange={(e)=>{setMaxPrice(parseInt(e.target.value))}}
                    />  
                </div>
            </div>
            <div className="mt6">
                <h4>Ofertas</h4>
                <button onClick={(e)=>handleSale(e)} 
                        className='saleButton'>
                    {radio? "Todos los productos": "Solo ofertas"}
                </button>
                
            </div>
        </form>
        </section>
    </div>
)



const ProductOne:React.FC<ProductProp> = ({ product }) => <div className="productSearhed">
    <div className="center">
        <img src={product.image} alt={product.name}/>
    </div>
    <div className="text-center">
        <h4>{product.brand}</h4>
        <p>{product.name}</p>

        {product.hasOwnProperty('stars')
            ?product.stars.toFixed(1)
            :null
        }
        
        <FontAwesomeIcon icon={faStar} className='starProductMenu'/>
        <h2>{product.price}€</h2>
    </div>
</div>



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
        return null
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
        <div>
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
