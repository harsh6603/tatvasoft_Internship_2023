import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import "../css/Navbar.css"
import { useFormik } from 'formik'
import bookService from '../services/book.service'
import { Button, Grid, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import BookContext from '../context/BookContext'
import Loader from './Loader'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import cartContext from '../context/CartContext'
import { bookSchema } from '../schemas'
import { toast } from 'react-toastify'

const initialValues = {
    search: ""
}

export default function Navbar() {    

    const context = useContext(BookContext);

    const contextOfCart = useContext(cartContext);

    const [books,setBooks] = useState(null);    

    const { values, handleBlur, handleSubmit, handleChange } = useFormik({
        initialValues: initialValues,
        // validationSchema: bookSchema,

        onSubmit: (values) => {         
            if(values.search)
            {
                context.setLoading(true);
                bookService.search(values.search).then((res) => {                
                    if (res)
                        setBooks(res);
                    else
                        setBooks("No product found")
                    displayProfile();
                    context.setLoading(false);
                })
            }
            else
            {
                toast.error("Please enter name of book.")
            }
        }
    })

    const displayProfile = (e) => {
        const modal = document.getElementById("myModal");
        const cover = document.getElementById("cover");
        modal.style.display = "block";        
        cover.style.display = "block";                
    }

    window.onclick = function (e) {
        const modal = document.getElementById("myModal");                        
        const cover = document.getElementById("cover");
        
        // console.log(e.target);
        if (e.target.className === "cover") {
            modal.style.display = "none";
            cover.style.display = "none";
        }        
    }

    const location = useLocation();    

    const handleLogout = () => {        
        localStorage.clear();
    }

    let currentTab = location.pathname.slice(1);

    return (
        <div>                    
            <Loader/>
            <div id="cover" className='cover'>

            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">Bookstore</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`${(currentTab === "")?"active":""} nav-link`} aria-current="page" to="/">Home</Link>
                            </li>
                            {
                                (localStorage.getItem("firstName") && localStorage.getItem("roleId")==='1')&&    
                                <li className="nav-item">
                                    <Link className={`${(currentTab === "user")?"active":""} nav-link`} to="/user">User</Link>
                                </li>
                            }
                            {
                                (localStorage.getItem("firstName") && localStorage.getItem("roleId")==='1')&&    
                                <li className="nav-item">
                                    <Link className={`${(currentTab === "category")?"active":""} nav-link`} to="/category">Category</Link>
                                </li>
                            }
                            {/* {
                                localStorage.getItem("firstName")&&
                                <li className="nav-item">
                                    <Link className={`${(currentTab === "book")?"active":""} nav-link`} to="/book">Book</Link>
                                </li>
                            } */}
                            {
                                (localStorage.getItem("firstName") && (localStorage.getItem("roleId")==='2' || localStorage.getItem("roleId")==='1'))&&
                                <li className="nav-item">
                                    <Link className={`${(currentTab === "book")?"active":""} nav-link`} to="/book">Book</Link>
                                </li>
                            }                            
                            {
                                !localStorage.getItem("firstName")&&
                                <li className="nav-item">
                                    <Link className={`${(currentTab === "register")?"active":""} nav-link`} to="/register">Register</Link>
                                </li>                    
                            }
                            {
                                !localStorage.getItem("firstName")&&
                                <li className="nav-item">
                                    <Link className={`${(currentTab === "login")?"active":""} nav-link`} to="/login">Login</Link>
                                </li>                            
                            }
                            {
                                localStorage.getItem("firstName")&&
                                <li className="nav-item">                                    
                                    <Link className='nav-link' to="/login" onClick={handleLogout}>logout</Link>
                                </li>                            
                            }
                        </ul>                        
                        <div style={{padding:"5px",marginRight:"2%",cursor:"pointer"}}>
                            <Link to='/cart' style={{textDecoration:"none",color:"black"}}>
                                {<ShoppingCartIcon color='warning'/>} {contextOfCart.cartData.length} Cart
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div style={{ width: "100%", height: "80px", backgroundColor: "lightgray"}}>                
                <div style={{ padding: "15px" }}>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>                        
                            <div className='col firstCol'>
                                <TextField
                                    variant='outlined'
                                    className='searchBox'
                                    name='search'
                                    id='search'
                                    value={values.search}
                                    style={{ position:"relative", backgroundColor: "white", width: "100%", borderRadius: "5px", border: "1px solid white", marginTop: "5px" }}
                                    inputProps={{
                                        style: {
                                            padding: 7,
                                        }
                                    }}
                                    sx={{
                                        "& fieldset": { border: 'none' },
                                    }}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    // (errors.search && touched.search) &&                                
                                    // <Typography variant='body2' color={"red"} > {errors.search} </Typography>
                                }
                                                                    
                                <div id="myModal" className="modalForProfile">
                                    <div id="profile" className="profileDivShow">
                                        <div className='booksDisplay'>                                            
                                            {
                                                books &&                                                
                                                (books.length !== 0)
                                                ?
                                                    books.map((book) => {                                                
                                                        return <div key={book._id}>
                                                            <Grid container>
                                                                <Grid className='styleLeft' item md={6} xs={6}>
                                                                    <p className={"firstLeft"}>{book.name}</p>
                                                                </Grid>
                                                                <Grid className='styleRight' item md={6} xs={6}>
                                                                    <Typography variant='body2' className='firstRight'>{book.price}</Typography>
                                                                </Grid>
                                                                <Grid className='styleLeft' item md={6} xs={6}>
                                                                    <p className='secondLeft'>{book.description}</p>
                                                                </Grid>
                                                                <Grid className='styleRight' item md={6} xs={6}>
                                                                    <p                                                                         
                                                                        className='secondRight' 
                                                                        style={{cursor:"pointer"}}
                                                                        onClick={() => {contextOfCart.addToCart(book.id,localStorage.getItem("id"))}}  
                                                                    >
                                                                        Add to cart
                                                                    </p>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    })
                                                :
                                                    <p>No product found</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className='col secondCol'>
                                <Button 
                                    type='submit' 
                                    startIcon={<SearchIcon />} 
                                    variant='contained' 
                                    color='warning' 
                                    style={{ margin: "5px 0 0 2%", padding: "5px 5%", fontSize: "16px", textTransform: "capitalize" }}                                     
                                >
                                    Search
                                </Button>
                            </div>
                        </div>  
                    </form>
                </div>                
            </div>
        </div>
    )
}
