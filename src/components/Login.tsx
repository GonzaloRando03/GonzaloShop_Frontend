import React, { useState } from 'react';
import loginService from '../services/loginService';
import { Link } from 'react-router-dom';
import { Event, FormEvent, LoginData, LoginResponse } from '../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toastError, toastInfo } from '../utils/toast';

//interfaces
interface LoginPropsTypes{
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<any>>
}


//componente
const Login:React.FC<LoginPropsTypes> = props => {

  const [loginValues, setLoginValues] = useState<LoginData>({
    username: "", password: ""
  })


  async function handleLogin(event: FormEvent){
    event.preventDefault()
    try{
      let loginResponse:LoginResponse = await loginService.sendLogin(loginValues)
      //guardamos el ususario en el storage
      window.localStorage.setItem('user', JSON.stringify(loginResponse))

      let cartStorage:string | null = window.localStorage.getItem('cart')
      
      if (cartStorage === null){
          window.localStorage.setItem('cart', JSON.stringify([]))
      }
      toastInfo('Sesión iniciadada con éxito')
      props.setLogin(false)
      props.setUser(loginResponse)

    }catch(error: any){
      const errorText: string = error.response.data.error
      toastError(errorText)
    }
  }


  function handleName(event: Event){
    event.preventDefault()
    let newValues = {...loginValues}
    newValues.username = event.target.value
    setLoginValues(newValues)
  }


  function handlePass(event: Event){
    event.preventDefault()
    let newValues = {...loginValues}
    newValues.password = event.target.value
    setLoginValues(newValues)
  }


  return (
    <div className='login fadeAnimation'>
      <FontAwesomeIcon 
        icon={faXmark} 
        className='quitLogin'
        onClick={() => props.setLogin(false)}
      />

      <div className='center'>

        <section className='loginForm padding'>
          <div className='flex'>
            <FontAwesomeIcon icon={faUser} className='loginIcon'/>
            <h2>Inicia sesión en GonzaloShop</h2>
          </div>

          <form onSubmit={(e) => handleLogin(e)}>
            <div className='flexCol'>
              Nombre de usuario
              <input type='text' 
                     value={loginValues.username}
                     onChange={(e) => handleName(e)}
              />
            </div>
            <div className='flexCol'>
              Contraseña
              <input type='password' 
                     value={loginValues.password}
                     onChange={(e) => handlePass(e)}
              />
            </div>
            <button type='submit'>Inicia sesión</button>
          </form>

          <Link className='registerLink' to={"/register"}>
            ¿No tienes cuenta? Registrate.
          </Link>
        </section>

      </div>
    </div>
  );
}

export default Login;
