import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

interface StarsProps{
    number: number
}

const Stars:React.FC<StarsProps> = props => {
    
    return(
        <div className='flex mb2'>
            <FontAwesomeIcon icon={faStar} className={
                props.number >= 1
                    ?'orange'
                    :'grey'
            }/>
            <FontAwesomeIcon icon={faStar} className={
                props.number >= 2
                    ?'orange'
                    :'grey'
            }/>
            <FontAwesomeIcon icon={faStar} className={
                props.number >= 3
                    ?'orange'
                    :'grey'
            }/>
            <FontAwesomeIcon icon={faStar} className={
                props.number >= 4
                    ?'orange'
                    :'grey'
            }/>
            <FontAwesomeIcon icon={faStar} className={
                props.number >= 5
                    ?'orange'
                    :'grey'
            }/>
        </div>
    )
}

export default Stars