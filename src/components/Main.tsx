import React, { useState, useEffect } from "react"
import Login from "./Login"
import { Children, FormEvent } from "../utils/types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'
import User from "./User"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"


 
//Main lleva un tipo de dato children que cree para los componentes que usen props.children
const Main: React.FC<Children> = props => {

    const [login, setLogin] = useState<boolean>(false)
    const [menu, setMenu] = useState<boolean>(false)
    const [user, setUser] = useState<any>(null)
    const [cart, setCart] = useState<any[]>()
    const [searchTitle, setSearch] = useState<string>("")
    const navigate = useNavigate()

    useEffect(()=>{
        let userStorage:string | null = window.localStorage.getItem('user')
        let cartStorage:string | null = window.localStorage.getItem('cart')
        
        if (cartStorage === null){
            window.localStorage.setItem('cart', JSON.stringify([]))
            setCart([])
        }else{
            setCart(JSON.parse(cartStorage))
        }

        if (userStorage !== null){
            let userJson:any = JSON.parse(userStorage)
            setUser(userJson)
        }
      },[])


    function handleSearch(event:FormEvent){
        event.preventDefault()
        if (searchTitle === ""){
            navigate('/products')
        }else{
            navigate(`/products/${searchTitle}`)
        }
    }


    return(
        <div>
            <header>
                <Link className="flex pointer noDecoration" to={'/home'}>
                    <h2>GonzaloShop</h2>
                    <FontAwesomeIcon icon={faCartShopping} className='mainIcon'/>
                </Link>
                <form>
                    <input  type='text' 
                            className="search"
                            value={searchTitle}
                            onChange={(e)=>{
                                setSearch(e.target.value)
                            }}/>
                    <Link to={`/products/${searchTitle}`}>
                        <button className='searchIcon' type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </Link>
                </form>
                {
                    user? <span className="username flex" onClick={() => setMenu(true)}>
                        <div className="infoHeader hover">
                            <FontAwesomeIcon icon={faUser} className='userInfoIcon'/> {user.username}
                        </div>
                        <div className="hover">
                            <FontAwesomeIcon icon={faWallet} className='userInfoIcon'/> {user.wallet.cantidad}€
                        </div>
                        <div className="hover">
                            <FontAwesomeIcon icon={faCartShopping} className='userInfoIcon ml1'/>
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