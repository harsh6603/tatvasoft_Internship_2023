import { Button, Card, CardActionArea, CardContent, CardMedia, Grid} from '@mui/material'
import React, { useContext } from 'react'
import "../css/BookResult.css"
import cartContext from '../context/CartContext'
// import { useFormik } from 'formik'

// const initialValues = {
//     searchBook:"",
//     sortType:""
// }

export default function BookResult(props) {

    const contextOfCart = useContext(cartContext)

    const { books,sortType } = props    

    const compare = (a,b) => {

        // console.log(a.name.toUpperCase() +" >> "+b.name.toUpperCase()+" >> ")
        // console.log(a.name.toUpperCase() > b.name.toUpperCase());

        if(sortType===1)
        {
            if(a.name.toUpperCase() < b.name.toUpperCase())
                return -1;
            
            if(a.name.toUpperCase() > b.name.toUpperCase())
                return 1;
    
            return 0;
        }
        else
        {
            if(a.name.toUpperCase() < b.name.toUpperCase())
                return 1;
            
            if(a.name.toUpperCase() > b.name.toUpperCase())
                return -1;
    
            return 0;
        }
    }    

    console.log(books);
    books&&
    books.sort(compare);    

    // const { values, handleBlur, handleChange } = useFormik({
    //     initialValues: initialValues,
    //     // validationSchema:bookSchema,

    //     onSubmit: (values) => {            
    //         // bookService.search(values).then((res) => {                
    //         //     if (res)
    //         //         setBooks(res);
    //         //     else
    //         //         setBooks("No product found")
    //         //     displayProfile();
    //         // })
    //     }
    // })

    return (
        <div>            
                {/* <div className='row'>
                    <div className='col'>
                        <h4 style={{textAlign:"left",padding:"2% 0"}}>Total - {books.length} items </h4>
                    </div>
                    <div className='col'>
                        <div className='row'>
                            <div className='col'>
                                <TextField
                                    variant='outlined'
                                    placeholder='Search ... '                                    
                                    className='searchBox'
                                    name='searchBook'
                                    id='searchBook'
                                    value={values.searchBook}
                                    style={{ position:"relative", backgroundColor: "white", width: "100%", borderRadius: "5px", border: "1px solid gainsboro", marginTop: "5px" }}
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
                            </div>
                            <div className='col'>      
                                <div className='row'>
                                    <div className='col sortByCol'>
                                        <p style={{marginBottom:0,marginTop:"10%"}}>Sort By</p>          
                                    </div> 
                                    <div className='col'>
                                        <Select
                                            className='selectField'                            
                                            variant='outlined'     
                                            name='sortType'
                                            id='sortType'                                                                                                                                       
                                            required
                                            style={{border:"1px solid gainsboro",height:"70%"}}
                                            sx={{
                                                "& fieldset": { border: 'none' },
                                            }}
                                            value={values.sortType}
                                            onChange={handleChange}
                                            onBlur={handleBlur}                                
                                        >                                
                                            <MenuItem value={1}>a - z</MenuItem>
                                            <MenuItem value={2}>z - a</MenuItem>                                
                                        </Select>                                        
                                    </div>   
                                </div>                                                                           
                            </div>
                        </div>
                    </div>
                </div> */}

                <Grid container spacing={3} >                
                    {
                        books &&
                        books.map((book) => {
                            return <Grid md={3} xs={12} key={book._id} item>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="220px"
                                            image={book.base64image}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <h4 className='cardTitle' component="div">
                                                {book.name}
                                            </h4>
                                            <p className='cardCategory' variant="body2" component="div">
                                                {book.category}
                                            </p>
                                            <p className='cardDes' variant="body2">
                                                {book.description}
                                            </p>
                                            <p className='cardPrice'>
                                                MRP ₹ {book.price}
                                            </p>
                                            <div className='cardBtn'>
                                                <Button 
                                                    fullWidth 
                                                    variant='contained' 
                                                    color='warning'
                                                    onClick={() => {contextOfCart.addToCart(book.id,localStorage.getItem("id"))}} 
                                                >
                                                    Add to cart
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        })  
                    }                
                </Grid>                                     
        </div>
    )
}
