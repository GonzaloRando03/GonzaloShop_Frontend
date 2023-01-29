//para componentes con props.children
export interface Children{
    children: JSX.Element
}

//tipos de datos para eventos
export type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
export type FormEvent = React.FormEvent<HTMLFormElement | HTMLButtonElement>

export interface ProductCart{
    name: string
    price: number
    cantidad: number
    image: string
}

export interface User{
    id?: string
    name: string
    lastname: string
    username: string
    email: string
    password: string
    bank_account: string
    wallet?: Wallet
    token?: string
}

export interface Wallet{
    cantidad?: number
    id_usuario?: string
    id?: string
    descuento?: number
    limite?: number
}

export interface Product{
    id: string
    name: string
    price?: number
    category?: string
    description?: string
    features?: any
    images: string[]
    image: string
    brand?: string
    type?: string
    stars: number
    valorations?: Valoration[]
    sale?: boolean
    error?: string
}

export interface Valoration{
    username: string
    text: string
    stars: number
}

export interface Compra{
    id?: number
    fechaEntrega: string
    fechaPedido: string
    precioTotal: number
    idUsuario?: number
    articulos: Articulo[]
    __typename?: string
}

export interface Articulo{
    id?: number
    nombre: string
    cantidad: number
    precio?: number
    __typename?: string
}

export interface LoginData{
    username: string
    password: string
}

export interface LoginResponse{
    name: string
    lastname: string
    username: string
    bank_account: string
    wallet:{
        cantidad: number
        limite: number
        descuento: number
    }
    token: string
}

interface ProductProp{
    product:Product
}