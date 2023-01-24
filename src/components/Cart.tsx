import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import { FormEvent, LoginResponse, User } from '../utils/types';
import { Event } from '../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"
import { toastError, toastInfo } from '../utils/toast';



//interfaces
interface FormValues{
  name: string
  lastname: string
  email: string
  username: string
  password: string
  password2: string
  bank_account:string
}


//componente
const Cart:React.FC = () => {

  const [cart, setCart] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(()=>{
    let cartStorage:string | null = window.localStorage.getItem('cart')
        
    if (cartStorage !== null){
        setCart(JSON.parse(cartStorage))
    }
  },[])

  const totalPrice:number = cart.reduce((a,b)=>a.price + b.price)

  return (
    <div className='register'>
      <div className='center'>
        <section className="flex color-primary pointer" 
                  onClick={()=>navigate('/home')}>
          <h2>GonzaloShop</h2>
          <FontAwesomeIcon icon={faCartShopping} className='mainIcon'/>
        </section>
      </div>
      <div className='center'>
        <section className='cart'>
          <h2 className='color-primary'>Tu carrito de la compra</h2>

          {cart.length !== 0
            ?cart.map(p=><div className='productoCart'>
              <h3>{p.name} x{p.cantidad}</h3>
              <div className='center'>
                <img src={p.image} alt='imagenProducto'/><br/>
              </div>
              <b>Precio: {p.price}€</b><br/>
              <button>Eliminar producto</button>
            </div>)
            :<h1>No tienes productos en la cesta</h1>}
            <h4 className='borderTop'>Precio total: {totalPrice}€</h4>
        </section>
      </div>
    </div>
  );
}

export default Cart;
