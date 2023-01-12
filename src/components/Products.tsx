import React, { useState } from 'react';
import { Product, ProductProp, FormEvent } from "../utils/types";
import { QueryResult, useQuery } from "@apollo/client";
import { PRODUCTS_SEARCH } from "../services/productsQueries";

const LateralPanel:React.FC = () => {

    const [radio, setRadio] = useState<boolean>()

    function handleSale(event:FormEvent){
        event.preventDefault()
        setRadio(!radio)
    }

    return (
    <div className="flex">
    <section className="lateralPanel">
      <h1 className='color-primary'>Filtros</h1>
      <form>
          <div>
              <h4>Categoría</h4>
              <select className="categorySelect">
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
              <select className="categorySelect">
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
                <input className="inputPrice" type="number" placeholder=" Precio en €"/>
              </div>
              <div className="mt2">
                Precio máximo 
                <input className="inputPrice mt1" type="number" placeholder=" Precio en €"/>  
              </div>
          </div>
          <div className="mt6">
              <h4>Ofertas</h4>
              <button onClick={(e)=>handleSale(e)} className='saleButton'>{radio? "Todos los productos": "Solo ofertas"}</button>
             
          </div>
          <button type='submit' className="filterApply">Aplicar filtros</button>
      </form>
    </section>
  </div>
  )
}



const ProductOne:React.FC<ProductProp> = ({ product }) => <div className="productSearhed">
    <div className="center">
        <img src={product.image} alt={product.name}/>
    </div>
    <div className="text-center">
        <h4>{product.brand}</h4>
        <p>{product.name}</p>
        {product.stars}
        <h2>{product.price}€</h2>
    </div>
</div>



const Products:React.FC = () => {
    const res: QueryResult<any> = useQuery(PRODUCTS_SEARCH)

    if (res.loading){
        return null
    }

    const products:Product[] = res.data.getProducts

    return (
        <div>
        <LateralPanel/>
        <section className="productsResults">
            {products.map((p:Product) => <ProductOne key={p.id} product={p}/>)}
        </section>
        </div>
    );
}

export default Products;
