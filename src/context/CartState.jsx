import React, { useContext, useState } from 'react'
import cartContext from './CartContext'
import cartService from '../services/cart.service'
import { toast } from 'react-toastify';
import BookContext from './BookContext';

export default function CartState(props) {

    const context = useContext(BookContext);

    const [cartData,setCartData] = useState([]);

    const getCartItems = (userid) => {
        context.setLoading(true);
        cartService.getList(userid).then((res) => {
            setCartData(res);    
            context.setLoading(false);        
        })
    }

    const updateCart = (updateCartData) => {
        context.setLoading(true);
        if(updateCartData)
        {
            setCartData(updateCartData);
            context.setLoading(false);
        }
        else
        {
            let userId = localStorage.getItem("id");
            cartService.getList(userId).then((res) => {
                setCartData(res);
                context.setLoading(false);
            });
        }
    }

    const addToCart = (bookId,userId) => {
        context.setLoading(true);
        cartService.add({
            userId:userId,
            bookId:bookId,
            quantity:1
        })
        .then((res) => {
            if(res.error)
            {
                toast.error("Somthing Went wrong")
                context.setLoading(false);
            }
            else    
            {
                toast.success("Item Added in cart.")
                updateCart();
            }
        })
        .catch((err) => {            
            console.log(err);
            context.setLoading(false);
        })
    }

    return (
        <cartContext.Provider value={{getCartItems,addToCart,updateCart,cartData}}>
            {props.children}
        </cartContext.Provider>
    )
}
