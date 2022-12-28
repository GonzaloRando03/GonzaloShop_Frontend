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
const Register:React.FC = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    let userStorage:string | null = window.localStorage.getItem('user')
        
    if (userStorage !== null){
        navigate('/home')
    }
  },[])

  const [registerValues, setRegisterValues] = useState<FormValues>({
    username: "", password: "", password2: "", lastname:"", 
    email: "", name: "", bank_account: ""
  })

  const [passwordError, setPasswordError] = useState<boolean>(false)


  async function handleSubmit(event: FormEvent){
    event.preventDefault()

    try {
      //comprobamos los campos
      if(registerValues.bank_account.length !== 20){
        toastError('El número de cuenta debe tener 20 dígitos')
      }

      if (registerValues.name.length < 3 ||
        registerValues.password.length < 3 ||
        registerValues.lastname.length < 0 ||
        registerValues.email.length < 3 ||
        registerValues.username.length < 3){

          toastError('Todos los campos son obligatorios')

      }else{
        const userToSend: User = {
          name: registerValues.name,
          lastname: registerValues.lastname,
          username: registerValues.username,
          password: registerValues.password,
          email: registerValues.email,
          bank_account: registerValues.bank_account
        }
  
        let userLogin:LoginResponse = await userService.sendUser(userToSend)
  
        //guardamos el ususario en el storage
        window.localStorage.setItem('user', JSON.stringify(userLogin))
        toastInfo('Usuario creado con éxito')
        navigate('/home')
      }

    //mensaje de error
    }catch(error: any){
      const errorText: string = error.response.data.error
      toastError(errorText)
    }
  }


  function handleChange(event: Event, value:string){
    event.preventDefault()
    let newValues:FormValues = {...registerValues}

    if (value === 'name'){
      newValues.name = event.target.value
    }else if(value === 'lastname'){
      newValues.lastname = event.target.value
    }else if(value === 'email'){
      newValues.email = event.target.value
    }else if(value === 'username'){
      newValues.username = event.target.value
    }else if(value === 'password'){
      newValues.password = event.target.value
    }else if(value === 'password2'){
      newValues.password2 = event.target.value
    }else{
      newValues.bank_account = event.target.value
    }

    if (newValues.password !== newValues.password2){
      setPasswordError(true)
    }else{
      setPasswordError(false)
    }
    
    setRegisterValues(newValues)
  }


  return (
    <div className='register center'>
        <div>
            <section className="flex color-primary registerTitle">
              <h2>GonzaloShop</h2>
              <FontAwesomeIcon icon={faCartShopping} className='mainIcon'/>
            </section>

            <section className='center'>
              <div className='registerForm'>
                <h2>Crear cuenta</h2>
                <form onSubmit={(e)=>handleSubmit(e)}>
                  <div className='flexCol'>
                    <b>Nombre</b>
                    <input type='text' 
                     placeholder='Escribe solo el nombre'
                     value={registerValues.name}
                     onChange={(e) => handleChange(e, 'name')}
                    />
                  </div>
                  <div className='flexCol'>
                    <b>Apellidos</b>
                    <input type='text' 
                     value={registerValues.lastname}
                     placeholder='Escribe aquí tus apellidos'
                     onChange={(e) => handleChange(e, 'lastname')}
                    />
                  </div>
                  <div className='flexCol'>
                    <b>Correo electrónico</b>
                    <input type='email' 
                     value={registerValues.email}
                     onChange={(e) => handleChange(e, 'email')}
                    />
                  </div>
                  <div className='flexCol'>
                    <b>Número de cuenta</b>
                    <input type='text' 
                     value={registerValues.bank_account}
                     pattern="[0-9]{20}"
                     onChange={(e) => handleChange(e, 'bank_account')}
                    />
                  </div>
                  <div className='flexCol'>
                    <b>Nombre de usuario</b>
                    <input type='text' 
                     value={registerValues.username}
                     placeholder='Nombre de tu usuario de GonzaloShop'
                     onChange={(e) => handleChange(e, 'username')}
                    />
                  </div>
                  <div className='flexCol'>
                    <b>Contraseña</b>
                    <input type='password' 
                     value={registerValues.password}
                     onChange={(e) => handleChange(e, 'password')}
                    />
                    {passwordError? <span className='error'>Las contraseñas no coinciden.</span>: null}
                    <input type='password' 
                     value={registerValues.password2}
                     placeholder='Repite tu contraseña'
                     onChange={(e) => handleChange(e, 'password2')}
                    />
                  </div>
                  <button type='submit'>Continuar</button>
                </form>

                <span className='avisoRegister'>
                  Todos los campos son <span className='color-primary'>obligatorios</span>, pulsa continuar para registrarte.<br/><br/>
                </span>
                <Link className='registerVolver' to={'/'}>Volver</Link>

              </div>
            </section>
        </div>

        
    </div>
  );
}

export default Register;
