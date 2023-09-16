import React, { useContext } from 'react'
import "../css/Loader.css"
import BookContext from '../context/BookContext'

export default function Loader() {

    const context = useContext(BookContext);

    return (
        context.loading &&
        <div 
            style={{
                width:"100%",
                height:"100%",                                
                position:"fixed",
                zIndex:"5",
                backdropFilter:"blur(8px)",                                            
            }}        
        >
            <div className='centerDiv'>
                <div className="loader"></div>
            </div>
        </div>
    )
}
