import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Event, FormEvent, LoginData } from '../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toastError, toastInfo } from '../utils/toast';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../services/userQueries';

//interfaces
interface LoginPropsTypes{
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
  setUser: React.Dispatch<React.SetStateAction<any>>
}


//componente
const Login:React.FC<LoginPropsTypes> = props => {

  const [loginUser, result] = useMutation(LOGIN_USER) 
  const [loginValues, setLoginValues] = useState<LoginData>({
    username: "", password: ""
  })


  useEffect(()=>{
    if(result.called && !result.loading){
      if (result.data?.loginUser.__typename === "User"){
        //guardamos el ususario en el storage
        window.localStorage.setItem('user', JSON.stringify(result.data?.loginUser))

        let cartStorage:string | null = window.localStorage.getItem('cart')
        
        if (cartStorage === null){
            window.localStorage.setItem('cart', JSON.stringify([]))
        }
        toastInfo('Sesión iniciada con éxito')
        props.setLogin(false)
        props.setUser(result.data?.loginUser)
  
      }else{
        toastError(result.data.loginUser.error)
      }
    }
  },[result.loading])

  

  async function handleLogin(event: FormEvent){
    event.preventDefault()
    try{
      loginUser({variables: {
        username: loginValues.username,
        password: loginValues.password
      }})

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
                     id='usernameLogin'
                     value={loginValues.username}
                     onChange={(e) => handleName(e)}
              />
            </div>
            <div className='flexCol'>
              Contraseña
              <input type='password' 
                     id='passwordLogin'
                     value={loginValues.password}
                     onChange={(e) => handlePass(e)}
              />
            </div>
            <button type='submit' id='loginButton'>Inicia sesión</button>
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
