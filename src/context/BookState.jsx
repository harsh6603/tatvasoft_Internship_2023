import React, { useState } from 'react'
import BookContext from './BookContext'

export default function BookState(props) {

    const [books,setBooks] = useState(null);

    const [loading,setLoading] = useState(false)

    return (
        <BookContext.Provider value={{books,setBooks,loading,setLoading}}>
            {props.children}
        </BookContext.Provider>
    )
}
