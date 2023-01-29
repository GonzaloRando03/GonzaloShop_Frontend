import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"
import { toastError, toastInfo } from '../utils/toast';
import { FormEvent, ProductCart, User } from '../utils/types';
import { useMutation } from '@apollo/client';
import { ADD_BUY } from '../services/buyQueries';

//función para formatear las fechas
function formatFecha(fecha:Date){
  const año:number = fecha.getFullYear()
  const mes:string = (fecha.getMonth() + 1) < 10
    ?`0${fecha.getMonth()+1}`
    : String(fecha.getMonth()+1)

  const dia:string = fecha.getDate() < 10
    ?`0${fecha.getDate()}`
    : String(fecha.getDate())

  return `${año}-${mes}-${dia}`
}

interface CartMenuProps{
  totalPrice: number
  cart: ProductCart[]
}

const CartMenu:React.FC<CartMenuProps> = props => {
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    bank_account: '',
    wallet: {}
  })

  const navigate = useNavigate()
  const [addBuy, result] = useMutation(ADD_BUY) 
  const [direction, setDirection] = useState<string>('')
  const precioConDescuento = props.totalPrice-((props.totalPrice*20)/100)


  useEffect(()=>{
    let userStorage:string | null = window.localStorage.getItem('user')

    if (userStorage === null){
      navigate('/home')
    }else{
      setUser(JSON.parse(userStorage))
    }

  },[])


  useEffect(()=>{
    console.log(result)
    if(result.called && !result.loading){
      
      if (result.data.sendBuy.__typename === "Compra"){
        window.localStorage.setItem('cart', JSON.stringify([]))

        if (user.wallet?.cantidad){
          user.wallet.cantidad-=user.wallet?.descuento !== undefined && user.wallet.descuento > 0
            ?precioConDescuento
            :props.totalPrice
        }

        if (user.wallet?.descuento && user.wallet?.descuento > 0){
          user.wallet.descuento = 0
        }

        window.localStorage.setItem('user', JSON.stringify(user))
        toastInfo('Compra realizada corréctamente')
        navigate('/home')
  
      }else{
        toastError(result.data.sendBuy.error)
      }
    }
  },[result.loading])




  async function handleCartBuy(e:FormEvent){
    e.preventDefault()
    if (direction.length < 5){
      toastError('La dirección es obligatoria')
      return null
    }
    
    try {
      const fechaActual:Date = new Date()
      const fecha15:Date = new Date()
      fecha15.setDate(fecha15.getDate()+15)
      const fechaPedido:string = formatFecha(fechaActual)
      const fechaEntrega:string = formatFecha(fecha15)
      const idUser = user.id? user.id: '0'

      addBuy({variables: {
        token: user.token,
        idUsuario: parseInt(idUser),
        precioTotal: user.wallet?.descuento !== undefined && user.wallet.descuento > 0
            ?precioConDescuento
            :props.totalPrice,
        fechaPedido: fechaPedido,
        fechaEntrega: fechaEntrega,
        articulos: props.cart.map(p => ({
          precio: p.price, 
          nombre: p.name, 
          cantidad: p.cantidad
        }))
      }})

    } catch (error:any) {
      toastError('No tienes dinero suficiente para hacer este pedido.')
    }
  }


  return(
    <section className='cartMenu'>
      <h1 className='color-primary'>Carrito de la compra de {user.username}.</h1>
      <div className='flexCol'>
        <b>Productos: {props.cart.length}</b>
        <b className='mt1'>Precio del carrito: {props.totalPrice.toFixed(2)}€</b>
        <span className='mt1'>
          <b>Descuento: </b> 
          {user.wallet?.descuento !== undefined && user.wallet.descuento > 0
            ? '20% de nuevo usuario debe aplicarse'
            : 'No'}
        </span>
        <b className='mt1'>Precio final: {
          user.wallet?.descuento !== undefined && user.wallet.descuento > 0
            ? precioConDescuento.toFixed(2)
            : props.totalPrice.toFixed(2)
        }€</b>
        <b className='mt1'>Número de cuenta: {user.bank_account.substring(0,5)+'**************'}</b>
        
        <form onSubmit={(e)=>handleCartBuy(e)} className='flexCol mt1'>
          <b>Dirección de envío:</b>
          <input className='direction' 
                 onChange={(e)=>setDirection(e.target.value)} 
                 type='text'
                 placeholder='Introduce tu dirección'
          />
          <button className='buyCartButton'
                  onClick={()=>navigate('/home')}>Seguir comprando</button>
          <button className='confirmCartButton'
                  type='submit'>Hacer pedido</button>
        </form>
      </div>
    </section>
  )
}


//componente
const Cart:React.FC = () => {

  const [cart, setCart] = useState<ProductCart[]>([])
  const navigate = useNavigate()

  useEffect(()=>{
    let cartStorage:string | null = window.localStorage.getItem('cart')
    if (cartStorage !== null){
        setCart(JSON.parse(cartStorage))
    }
  },[])

  const totalPrice:number = cart.reduce((a,b)=>a + b.price, 0)


  function delProductCart(name:string){
    let newCart = [...cart]
    newCart.forEach((e:any) => {
      if (e.name === name && e.cantidad > 1){
          e.price-=(e.price/e.cantidad )
          e.price = parseFloat(e.price)
          e.cantidad--
          window.localStorage.setItem('cart', JSON.stringify(newCart))
          setCart(newCart)
      }else if (e.name === name && e.cantidad <= 1){
        const res = newCart.filter(e => e.name != name)
        window.localStorage.setItem('cart', JSON.stringify(res))
        setCart(res)
      }
    })
    toastInfo('Producto eliminado con éxito')
  }


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
        <div className='cartContainer'>
          <section className='cart'>
            <h2 className='color-primary'>Productos</h2>

            {cart.length !== 0
              ?cart.map(p=><div key={p.name} className='productoCart'>
                <h3>{p.name} x{p.cantidad}</h3>
                <div className='center'>
                  <img src={p.image} alt='imagenProducto'/><br/>
                </div>
                <b>Precio: {p.price.toFixed(2)}€</b><br/>
                <button className='delProduct'
                        onClick={()=>delProductCart(p.name)}>Eliminar producto</button>
              </div>)
              :<h1>No tienes productos en la cesta</h1>}
              <h4 className='borderTop'>Precio total: {totalPrice.toFixed(2)}€</h4>
          </section>
          <CartMenu cart={cart} totalPrice={totalPrice}/>
        </div>
      </div>
    </div>
  );
}

export default Cart;
