import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


export const HomeLoader:React.FC = () => {

  return (
    <div className='homeLoader center'>
        <div>
            <section className="flex color-primary homeLoaderTitle">
              <h2>GonzaloShop</h2>
              <FontAwesomeIcon icon={faCartShopping} className='mainIcon'/>
            </section>
            <section className='center'>
              <div>
              <div className='loader'/>
              <h3 className='loaderTitle'>Cargando...</h3>
              </div>
            </section>
        </div>
    </div>
  );
}


export const ProductsLoader:React.FC = () => {
  return(
    <section className="productsResults">
        <section className='center'>
          <div className="mt5 mb">
            <div className='loader'/>
            <h3 className='loaderTitle'>Cargando...</h3>
          </div>
        </section>
    </section>)
}


