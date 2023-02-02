import React, { useState, useEffect } from "react"
import Login from "./Login"
import { Children, FormEvent, ProductCart, User } from "../utils/types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faUser, faWallet } from '@fortawesome/free-solid-svg-icons'
import UserMenu from "./UserMenu"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"


 
//Main lleva un tipo de dato children que cree para los componentes que usen props.children
const Main: React.FC<Children> = props => {

    const [login, setLogin] = useState<boolean>(false)
    const [menu, setMenu] = useState<boolean>(false)
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
    const [cart, setCart] = useState<ProductCart[]>()
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

        if (userStorage !== null && JSON.parse(userStorage).username.length > 3){
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
                            id="searchInput"
                            value={searchTitle}
                            onChange={(e) => {
                                setSearch(e.target.value)
                            }}/>
                    <Link to={`/products/${searchTitle}`}>
                        <button className='searchIcon' type="submit" id="searchButton">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </button>
                    </Link>
                </form>
                {
                    user && user.username.length > 3? <span id="userMenu" className="username flex" onClick={() => setMenu(true)}>
                        <div className="infoHeader hover">
                            <FontAwesomeIcon icon={faUser} className='userInfoIcon'/> {user.username}
                        </div>
                        <div className="hover">
                            <FontAwesomeIcon icon={faWallet} className='userInfoIcon'/> {user.wallet?.cantidad?.toFixed(2)}€
                        </div>
                        <Link to={'/cart'} className="hover color-white">
                            <FontAwesomeIcon icon={faCartShopping} className='userInfoIcon ml1'/>
                        </Link>
                    </span>

                    :<span onClick={() => setLogin(true)} className="identify" id="identify">
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
                    <UserMenu setMenu={setMenu} setUser={setUser} user={user}/>
                    <div className="blackTransparentBg fadeAnimation5"></div>
                </div>
            
            :null}
        </div>
    )
}

export default Main