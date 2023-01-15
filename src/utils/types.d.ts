//para componentes con props.children
export interface Children{
    children: JSX.Element
}

//tipos de datos para eventos
export type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
export type FormEvent = React.FormEvent<HTMLFormElement | HTMLButtonElement>

export interface User{
    name: string
    lastname: string
    username: string
    email: string
    password: string
    bank_account: string
}

export interface Product{
    id: string
    name: string
    price: number
    category: string
    description: string
    features: any
    images: string[]
    image: string
    brand: string
    type: string
    stars: number
    valorations: Valoration[]
    sale: boolean
    error: string
}

export interface Valoration{
    username: string
    text: string
    stars: number
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