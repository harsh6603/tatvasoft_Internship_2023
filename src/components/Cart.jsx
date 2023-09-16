import { Button, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cartContext from '../context/CartContext';
import cartService from '../services/cart.service';
import BookContext from '../context/BookContext';
import orderService from '../services/order.service';

export default function Cart() {

    const navigate = useNavigate();

    const contextOfCart = useContext(cartContext);

    const context = useContext(BookContext);

    // const [cartList,setCartList] = useState([]);
    const [itemsInCart,setItemsInCart] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);

    useEffect(() => {
        if(!localStorage.getItem("firstName"))
        {
            toast.info("Please Login/Register before going into cart");
            navigate("/login");
        }
        contextOfCart.getCartItems(localStorage.getItem("id"));
        // eslint-disable-next-line
    },[])

    const getTotalPrice = (cartItems) => {

        let total = 0,itemPrice;

        cartItems.forEach((item) => {
            itemPrice = item.quantity * parseInt(item.book.price);
            total = total + itemPrice;
        })

        setTotalPrice(total);
    }

    useEffect(() => {        
        // setCartList(contextOfCart.cartData);
        setItemsInCart(contextOfCart.cartData.length);
        getTotalPrice(contextOfCart.cartData)
        // eslint-disable-next-line
    },[contextOfCart.cartData])

    const removeItem = (id) => {
        context.setLoading(true);
        cartService.removeItem(id).then((res) => {            
            contextOfCart.updateCart();
            context.setLoading(false);
        })
        .catch((err) => {
            toast.error("Something went wrong");
        })
    }

    const updateQuantity = async(item,inc) => {
        const currentCount = item.quantity            

        const quantity = inc ? currentCount +1 :currentCount - 1;        

        if(quantity === 0)
        {
            toast.error("Item quantity should not be zero.")
            return
        }

        try{
            context.setLoading(true);
            const res = await cartService.updateItem({
                id: item.id,
                userId: item.userId,
                bookId: item.bookId,
                quantity: quantity
            })

            if(res)
            {                
                const updatedCartList = contextOfCart.cartData.map((cItem) =>
                    cItem.id === item.id ? {...cItem,quantity} : cItem
                );

                contextOfCart.updateCart(updatedCartList);

                const updatedPrice = totalPrice + 
                (inc
                    ? parseInt(item.book.price)
                    : - parseInt(item.book.price)
                );                            

                setTotalPrice(updatedPrice);                                          
                context.setLoading(false);
            }
        }
        catch(err)
        {
            toast.error("Something went wrong.")
        }
    }

    const placeOrder = async() => {
        let userId = localStorage.getItem("id");

        if(userId)
        {
            const userCart = await cartService.getList(userId)
            if(userCart.length)
            {
                try{

                    let cartIds = userCart.map((element) => element.id);

                    const newOrder = {
                        userId : userId,
                        cartIds
                    }

                    orderService.placeOrder(newOrder).then((res) => {
                        if(res)
                        {                            
                            navigate("/");
                            toast.success("Your order is successfully placed");                        
                            contextOfCart.getCartItems(userId);
                        }
                    })
                }
                catch(err)
                {
                    toast.error("Order can not be placed ",err);
                }
            }
            else
            {
                toast.error("Your cart is empty.")
            }
        }
    }

    return (
        <div style={{ padding: "3% 0" }}>
            <div className="container">
                <Typography variant='h4' className='title'>Cart Page</Typography>

                <div style={{padding:"3% 25%"}}>
                    <Grid container spacing={4} style={{paddingBottom:"5%"}}>
                        <Grid item md={6} xs={6} style={{textAlign:"left"}}>
                            <h6>
                                My Shopping Bag ({itemsInCart} Items)
                            </h6>
                        </Grid>
                        <Grid item md={6} xs={6} style={{textAlign:"right"}}>
                            <h6>Total Price : {totalPrice}</h6>
                        </Grid>
                    </Grid>

                    <Grid container>                        
                        {
                            contextOfCart.cartData.map((item) => {
                                return <Grid key={item.id} item md={12} xs={12} style={{border:"1px solid gainsboro",padding:"3%",height:"150px",margin:"2% 0"}}>
                                    
                                    <Grid container style={{textAlign:"left"}}>
                                        <Grid item md={4} xs={4}>
                                            <img style={{width:"70%",height:"50%"}} src={item.book.base64image} alt={""}/>
                                        </Grid>
                                        <Grid item md={4} xs={4} style={{textAlign:"left"}}>
                                            <p>{item.book.name}</p>
                                            <div>
                                                <Button
                                                    variant='contained'
                                                    color='warning'
                                                    onClick={() => {updateQuantity(item,true)}}
                                                    style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}                                                
                                                >
                                                    +
                                                </Button>
                                                <span> {item.quantity} </span>
                                                <Button
                                                    variant='contained'
                                                    color='warning'            
                                                    onClick={() => {updateQuantity(item,false)}}                                    
                                                    style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                                                >
                                                    -
                                                </Button>
                                            </div>
                                        </Grid>
                                        <Grid item md={4} xs={4} style={{textAlign:"right"}}>                                            
                                            <p>MRP {item.book.price}</p>
                                            <Button color='warning' onClick={() => {removeItem(item.id)}}>Remove</Button>
                                        </Grid>
                                    </Grid>


                                </Grid>
                            })
                        }
                    </Grid>
                    
                    <div style={{textAlign:"left"}}>
                        <Button 
                            variant='contained'
                            color='warning' 
                            onClick={placeOrder}                       
                        >
                            Place Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
