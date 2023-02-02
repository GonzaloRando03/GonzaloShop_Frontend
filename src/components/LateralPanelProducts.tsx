import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

interface PanelProps{
    handleSubmit: any
    setRadio: any
    setCategory: any
    setOrder: any
    setMaxPrice: any
    setMinPrice: any
    radio: boolean
    handleSale: any
    category: string
    order: string
}

const LateralPanel:React.FC<PanelProps> = ({
    handleSubmit, 
    radio, 
    handleSale, 
    setCategory, 
    setOrder, 
    setMaxPrice, 
    setMinPrice,
    category,
    order

}) =><div className="flex">
    <section className="lateralPanel">
        <div className='flex color-primary'>
            <h2>GonzaloShop</h2>
            <FontAwesomeIcon icon={faCartShopping} className='mainIcon'/>
        </div>
        <h1>Filtros</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <button type='submit' className="filterApply" id="applyFilters">
                Aplicar filtros
            </button>
            <div>
                <h4>Categoría</h4>
                <select className="categorySelect" 
                        id="category"
                        value={category}
                        onChange={(e)=>{
                            setCategory(e.target.value)
                    }
                }>          
                    <option>Todas las categorías</option>
                    <option>Tecnología</option>
                    <option>Hogar</option>
                    <option>Ropa</option>
                    <option>Complementos</option>
                    <option>Juguetes</option>
                    <option>Cocina</option>
                </select>
            </div>
            <div className="mt6 ">
                <h4>Ordenar por</h4>
                <select className="categorySelect"
                        value={order}
                        onChange={(e)=>{
                            setOrder(e.target.value)
                    }
                }>
                    <option>Destacados</option>
                    <option>Precio más bajo</option>
                    <option>Precio más alto</option>
                    <option>Valoración</option>
                </select>
            </div>
            <div className="mt6">
                <h4>Precio</h4>
                <div >
                    Precio mínimo 
                    <input  className="inputPrice" 
                            type="number" 
                            placeholder=" Precio en €" 
                            onChange={(e)=>{setMinPrice(parseInt(e.target.value))}}
                    />
                </div>
                <div className="mt2">
                    Precio máximo 
                    <input  className="inputPrice mt1" 
                            type="number" 
                            placeholder=" Precio en €" 
                            onChange={(e)=>{setMaxPrice(parseInt(e.target.value))}}
                    />  
                </div>
            </div>
            <div className="mt6">
                <h4>Ofertas</h4>
                <button onClick={(e)=>handleSale(e)} 
                        className='saleButton'>
                    {radio? "Todos los productos": "Solo ofertas"}
                </button>
                
            </div>
        </form>
    </section>
</div>


export default LateralPanel