import React, { useState } from 'react';
import loginService from '../services/loginService';
import { Link } from 'react-router-dom';
import { Event, FormEvent, LoginData, LoginResponse } from '../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toastError, toastInfo } from '../utils/toast';
import userService from '../services/userService';

//interfaces
interface LoginPropsTypes{
  setMenu: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<any>>
  user: any
}


//componente
const UserMenu:React.FC<LoginPropsTypes> = props => {

  const [deleteAcount, setDeleteAcount] = useState<boolean>(false)

  async function sendMoney(money:number){
    try{
      const resWallet = await userService.handleMoney(money, props.user.username)
      const userUpdate = {...props.user}
      userUpdate.wallet.cantidad = resWallet.cantidad
      window.localStorage.setItem('user', JSON.stringify(userUpdate))
      props.setUser(userUpdate)
      toastInfo('Añadido correctamente')

    }catch(error: any){
      const errorText: string = error.response.data.error
      toastError(errorText)
    }
  }


  function unlog(){
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('cart')
    props.setMenu(false)
    props.setUser(null)
    toastInfo('Sesión cerrada correctamente')
  }

  async function deleteUser(token:string){
    try{
      const response = await userService.delUser(token)
      console.log(response)
      window.localStorage.removeItem('user')
      props.setMenu(false)
      props.setUser(null)
      toastInfo('Usuario eliminado correctamente')

    }catch(error:any){
      const errorText: string = error.response.data.error
      toastError(errorText)
    }
  }



  return (
    <div className='login fadeAnimation'>
      <FontAwesomeIcon 
        icon={faXmark} 
        className='quitLogin'
        onClick={() => props.setMenu(false)}
      />

      <div className='center'>

        <section className='loginForm padding'>
          <div className='flex'>
            <FontAwesomeIcon icon={faUser} className='loginIcon'/>
            <h2>{props.user.name} {props.user.lastname}</h2>
            <Link to={'/cart'}>
              <button className='showCart'>Ver carrito</button>
            </Link>
          </div>

          <section className='addWallet'>
            <h3>Añade dinero a tu monedero</h3>
            <div className='center'>
              <div className='flex'>
                <div className='money' onClick={()=>sendMoney(10)}>10€</div>
                <div className='money' onClick={()=>sendMoney(20)}>20€</div>
                <div className='money' onClick={()=>sendMoney(50)}>50€</div>
              </div>
            </div>
          </section>

          <div className='mb-1'>Aviso: Estas operaciones <span className='color-secondary'>añadirán cargos</span> a tu tarjeta de crédito.</div>
          
          <button>Ver pedidos</button>
          <button onClick={() => unlog()} className='ml1'>Cerrar sesión</button>
          <button onClick={() => setDeleteAcount(!deleteAcount)} className='ml1'>
            {deleteAcount? 'Cancelar': 'Eliminar cuenta'}
          </button>

          {deleteAcount? <section>
            Los cambios no serán reversibles, si está seguro que quiere <br/> eliminar su cuenta pulse <b onClick={()=>deleteUser(props.user.token)} className='delete'>eliminar</b>.
          </section>:null}

        </section>

      </div>
    </div>
  );
}

export default UserMenu;
