import { Container, MenuItem, Pagination, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useMemo, useState } from 'react'
// import SearchIcon from '@mui/icons-material/Search';
import { useFormik } from 'formik';
import bookService from '../services/book.service';
import BookResult from './BookResult';
import { useNavigate } from 'react-router-dom';
import BookContext from '../context/BookContext';

const initialValues = {
    searchBook: "",
    sortType: 1
}

export default function Home(props) {

    const navigate = useNavigate();    

    const context = useContext(BookContext)

    useEffect(() => {
        if (!localStorage.getItem("firstName")) {
            navigate("/login");
        }        
        // eslint-disable-next-line
    }, [])    

    // const [books, setBooks] = useState(null);    

    const [bookResponse,setBookResponse] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
    })

    const [filters,setFilters] = useState({
        pageIndex : 1,
        pageSize: 8,
        keyword: "",
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            window.scrollTo(0,0);
            context.setLoading(true);
            if(filters.keyword==="")delete filters.keyword;
            bookService.getAll({...filters}).then((res) => {
                // setBooks(res);
                setBookResponse(res);
                console.log(bookResponse);
                context.setLoading(false);
                // console.log(books);                        
            })
        },500);

        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [filters])    

    const books = useMemo(() => {
        const bookList = [...bookResponse.items]
        console.log(bookResponse)
        console.log(bookList);
        if(bookList)
        {
            // bookList.forEach((element) => {
            //     element.category = category.find(
            //         (a) => a.id === element.categoryId
            //     )?.name
            // })            
            return bookList;
        }
        return []
    },[bookResponse])

    const { values, handleBlur, handleChange } = useFormik({
        initialValues: initialValues,
        // validationSchema:bookSchema,        
        
        onSubmit: (values) => {
            
        }
    })

    // const searchOnChange = (searchKeyword) => {        
    //     if(searchKeyword)
    //     {
    //         bookService.pagewise(searchKeyword).then((res) => {    
    //             // console.log(res)        
    //             setBooks(res.items);                            
    //         })
    //     }
    //     else
    //     {
    //         bookService.getAll().then((res) => {
    //             setBooks(res);
    //             // console.log(books);
    //         })
    //     }
    // }    

    // const displayProfile = (e) => {
    //     const modal = document.getElementById("myModal");
    //     modal.style.display = "block";        
    // }

    // window.onclick = function (e) {
    //     const modal = document.getElementById("myModal");                        

    //     console.log(e.target);
    //     if (e.target === modal) {
    //         modal.style.display = "none";
    //     }        
    // }

    // console.log(values);

    return (
        <div style={{ padding: "3% 0" }}>            
            <Typography variant='h4' className='title'>Book Listing</Typography>

            <Container>
                <div className='row'>
                    <div className='col'>
                        <h4 style={{ textAlign: "left", padding: "2% 0" }}>Total - {bookResponse?bookResponse.totalItems:0} items </h4>
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
                                    style={{ position: "relative", backgroundColor: "white", width: "100%", borderRadius: "5px", border: "1px solid gainsboro", marginTop: "5px" }}
                                    inputProps={{
                                        style: {
                                            padding: 7,
                                        }
                                    }}
                                    sx={{
                                        "& fieldset": { border: 'none' },
                                    }}
                                    // onChange={(e) => {
                                    //     handleChange("searchBook")(e);
                                    //     searchOnChange(e.currentTarget.value)
                                    // }}
                                    onChange={(e) => {
                                        handleChange("searchBook")(e);
                                        setFilters({
                                            ...filters,
                                            keyword:e.target.value,
                                            pageIndex:1
                                        })
                                    }}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className='col'>
                                <div className='row'>
                                    <div className='col sortByCol'>
                                        <p style={{ marginBottom: 0, marginTop: "10%" }}>Sort By</p>
                                    </div>
                                    <div className='col'>
                                        <Select
                                            className='selectField'
                                            variant='outlined'
                                            name='sortType'
                                            id='sortType'
                                            required
                                            style={{ border: "1px solid gainsboro", height: "70%" }}
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
                </div>


                {/* <div style={{ width: "100%", height: "80px", backgroundColor: "lightgray", margin: "4% 0" }}>                
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
                                    <div id="myModal" className="modalForProfile">
                                        <div id="profile" className="profileDivShow">
                                            <div className='booksDisplay'>
                                                {
                                                    books &&
                                                    books.map((book) => {                                                
                                                        return <p key={book._id}>{book.name}</p>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
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
            </div> */}
                {
                    books &&
                    <BookResult books={books} bookResponse={bookResponse} filters={filters} setFilters={setFilters} sortType={values.sortType} />                    
                }
                {
                    books&&
                    <Pagination
                        style={{paddingTop:"2%"}}
                        count={bookResponse.totalPages}
                        color='warning'
                        page={filters.pageIndex}
                        onChange={(e,newPage) => {
                            setFilters({
                                ...filters,
                                pageIndex:newPage
                            })
                        }}
                    />   
                }
            </Container>
        </div>
    )
}
