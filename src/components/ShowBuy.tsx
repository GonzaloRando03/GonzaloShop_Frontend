import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"
import { toastError } from '../utils/toast';
import { Compra, User } from '../utils/types';
import { useMutation } from '@apollo/client';
import { GET_BUY } from '../services/buyQueries';
import { HomeLoader } from './Loaders';



const ShowBuy:React.FC = () => {
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
  const [getBuy, result] = useMutation(GET_BUY) 
  const [compras, setCompras] = useState<Compra[]>([])

  useEffect(()=>{
    let userStorage:string | null = window.localStorage.getItem('user')

    if (userStorage === null){
      navigate('/home')
    }else{
      setUser(JSON.parse(userStorage))
      getBuy({variables:{
        idUsuario: parseInt(JSON.parse(userStorage).id),
        token: JSON.parse(userStorage).token
      }})
      
    }
  },[])


  useEffect(()=>{
    if(result.called && !result.loading){
      console.log(result.data)
      if (result.data?.getBuy[0].__typename === "Compra"){
        setCompras(result.data.getBuy)
      }else{
        toastError(result.data.getBuy[0].error)
      }
    }
  },[result])

  //función que devuelve el estado del pedido dependiendo de la fecha que sea
  //menos de 3 dias desde que se realizó el pedido: en proceso, más: en reparto, pasa la fecha de entrega: entregado
  function compareDate(fechaEntrega:string, fechaPedido:string){
    const today = new Date()
    const fechaEntregaDate = new Date (fechaEntrega + 'T03:00:00')
    const fechaReparto = new Date (fechaPedido + 'T03:00:00')
    fechaReparto.setDate(fechaReparto.getDate() + 3)
    if( today > fechaReparto ){
      return "Pedido enviado"
    }else if (today > fechaEntregaDate){
      return "Entregado"
    }else{
      return "Pedido en proceso"
    }
  }


  if (result.loading){
    return <HomeLoader/>
  }

  return(
    <div className='register'>
      <div className='center'>
        <section className="flex color-primary pointer" 
                  onClick={()=>navigate('/home')}>
          <h2>GonzaloShop</h2>
          <FontAwesomeIcon icon={faCartShopping} className='mainIcon'/>
        </section>
      </div>
      {
        compras.length !== 0
          ?<div>
            <div>
              <h1 className='pedidosTitle'>Pedidos de {user.username}:</h1>
            </div>
            <div className='center'>
              <table>
                <thead className='color-primary'>
                  <tr>
                    <th>Nº</th>
                    <th>Fecha de la compra</th>
                    <th>Fecha de entrega</th>
                    <th>Precio Total</th>
                    <th>Estado del pedido</th>
                    <th>Artículos</th>
                  </tr>
                </thead>
                <tbody>
                {
                  compras.map((c,i) => <tr key={i}>
                    <td className='color-primary' >{i + 1}</td>
                    <td>{c.fechaPedido}</td>
                    <td>{c.fechaEntrega}</td>
                    <td>{c.precioTotal.toFixed(2)}€</td>
                    <td>{
                      compareDate(c.fechaEntrega, c.fechaPedido)
                    }</td>
                    <td className='articulosTable'>
                      {
                        c.articulos.map((a,i) => <p key={i}>
                          <b>Nombre: </b>{a.nombre} <br/> <b>Cantidad: </b>{a.cantidad} <br/> <b>Precio: </b>{a.precio}€
                        </p>)
                      }
                    </td>
                  </tr>)
                }
                </tbody>
              </table>
            </div>
          </div>
        :<div>
          <h1 className='pedidosTitle'>Todavía no has realizado ningún pedido.</h1>
        </div>
      }
    </div>
  )
}


export default ShowBuy;
