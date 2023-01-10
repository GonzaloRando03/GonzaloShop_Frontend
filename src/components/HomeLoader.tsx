import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const HomeLoader:React.FC = () => {

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

export default HomeLoader;
