import React, { useState, useEffect } from "react"
import Login from "./Login"
import { Children } from "../utils/types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'
import User from "./User"


 
//Main lleva un tipo de dato children que cree para los componentes que usen props.children
const Main: React.FC<Children> = props => {

    const [login, setLogin] = useState<boolean>(false)
    const [menu, setMenu] = useState<boolean>(false)
    const [user, setUser] = useState<any>(null)

    useEffect(()=>{
        let userStorage:string | null = window.localStorage.getItem('user')
        
        if (userStorage !== null){
            let userJson:any = JSON.parse(userStorage)
            setUser(userJson)
        }
      },[])


    return(
        <div>
            <header>
                <div className="flex">
                    <h2>GonzaloShop</h2>
                    <FontAwesomeIcon icon={faCartShopping} className='mainIcon'/>
                </div>
                <form>
                    <input type='text' className="search"/>
                    <button className='searchIcon'>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
                </form>
                {
                    user? <span className="username flex" onClick={() => setMenu(true)}>
                        <div className="infoHeader">
                            <FontAwesomeIcon icon={faUser} className='userInfoIcon'/> {user.username}
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faWallet} className='userInfoIcon'/> {user.wallet.cantidad}€
                        </div>
                    </span>

                    :<span onClick={() => setLogin(true)} className="identify">
                        Hola! Identifícate
                    </span>
                }
            </header>

            {props.children}

            <footer>
                <section onClick={() => {window.scroll(0,0)}} className="volver">
                    Volver arriba
                </section>
                <section className="footerLogo center">
                    <div className="flex">
                        <h2>GonzaloShop</h2>
                        <FontAwesomeIcon icon={faCartShopping} className='mainIcon'/>
                    </div>
                </section>
                <section className="credits">
                    Aplicación desarrollada por Gonzalo Rando Serna ( gonzalorando03@gmail.com )
                </section>
            </footer>

            {login? 
                <div>
                    <Login setLogin={setLogin} setUser={setUser}/>
                    <div className="blackTransparentBg fadeAnimation5"></div>
                </div>
            
            :null}

            {menu? 
                <div>
                    <User setMenu={setMenu} setUser={setUser} user={user}/>
                    <div className="blackTransparentBg fadeAnimation5"></div>
                </div>
            
            :null}
        </div>
    )
}

export default Main