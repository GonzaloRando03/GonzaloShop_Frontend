import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import CSS from 'csstype';


interface SliderPropTypes{
    images: string[]
}


const Slider: React.FC<SliderPropTypes> = ({images}) =>{

    const [indexImage, setIndexImage] = useState<number>(0)

    function left(){
        if (indexImage !== 0){
            setIndexImage(indexImage-1)
        }
    }

    function right(){
        if (indexImage !== images.length-1){
            setIndexImage(indexImage+1)
        }
    }

    //estilos css
    const ImageStyles: CSS.Properties = {
        backgroundImage: `url(${images[indexImage]})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '100%'
      }

    return(
        <div className="slider">
            <button onClick={left} className="leftChervon">
             <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div style={ImageStyles}>
        
            </div>
            <button onClick={right} className="rightChervon">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    )
} 

export default Slider