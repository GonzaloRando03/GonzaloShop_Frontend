//para componentes con props.children
export interface Children{
    children: JSX.Element
}

//tipos de datos para eventos
export type Event = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >
export type FormEvent = React.FormEvent<HTMLFormElement>

export interface User{
    name: string
    lastname: string
    username: string
    email: string
    password: string
    bank_account: string
}

export interface Product{
    name: string
    price: number
    category: string
    description: string
    features: any
    images: string[]
    brand: string
    type: string
    valorations: Valoration[]
    sale: boolean
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