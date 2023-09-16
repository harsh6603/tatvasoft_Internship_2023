import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bookService from '../services/book.service';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import categoryService from '../services/category.service';
import "../css/Book.css"
import BookContext from '../context/BookContext';
import { toast } from 'react-toastify';
import ConfirmationDialog from './ConfirmationDialog';

export default function BookOperation() {

    const context = useContext(BookContext);

    const [filters, setFilters] = useState({
        pageIndex: 1,
        pageSize: 10,
        keyword: "",
    });
    const [bookRecords, setBookRecords] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        //if user not login
        if(!localStorage.getItem("firstName")) {
            navigate("/login");
        }
        
        //if user login but user is not seller then do not give access 
        if(localStorage.getItem("roleId")==='1' || localStorage.getItem("roleId")==='2')
            getAllCategories();
        else
        {
            toast.warning("Sorry, you are not authorized to access this page");
            navigate("/");                                
        }                

        // eslint-disable-next-line
    }, [])       

    const getAllCategories = async () => {
        context.setLoading(true);
        await categoryService.getAll().then((res) => {
            if (res) {
                setCategories(res);
                // context.setLoading(false);
            }
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            
            context.setLoading(true);        

            if (filters.keyword === "") delete filters.keyword;

            bookService.getAll(filters).then((res) => {
                setBookRecords(res);
                context.setLoading(false);
            });

        }, 500);
        return () => clearTimeout(timer);

        // eslint-disable-next-line
    }, [filters]);    

    const columns = [
        { id: "name", label: "Book Name", minWidth: 100 },
        { id: "price", label: "Price", minWidth: 100 },
        { id: "category", label: "Category", minWidth: 100 },
    ];

    const onConfirmDelete = () => {
        bookService
            .deleteBook(selectedId)
            .then((res) => {
                toast.success("Record deleted successfully");
                setOpen(false);
                setFilters({ ...filters, pageIndex: 1 });
            })
            .catch((e) => toast.error("Record cannot be deleted"));
    };

    return (
        <div style={{ padding: "3% 0" }}> 
            <div className="container">
                <Typography variant='h4' className='title'>Book Page</Typography>
                <div>
                    <div className='row'>
                        <div className='col firstColOfSearch'>
                            
                        </div>
                        <div className='col secondColofSearch'>
                            <TextField
                                id="text"
                                name="text"
                                className='searchBox'                            
                                placeholder="Search..."
                                variant="outlined"                                
                                style={{ backgroundColor: "white", border: "1px solid gainsboro",marginRight:"4%",width:"50%"}}
                                inputProps={{
                                    style: {
                                        padding: 7,
                                    }
                                }}
                                sx={{
                                    "& fieldset": { border: 'none' },
                                }}
                                onChange={(e) => {
                                    setFilters({ ...filters, keyword: e.target.value, pageIndex: 1 });
                                }}
                            />
                            <Button
                                type="button"                                
                                variant="contained"
                                color="warning"
                                style={{width:"15%"}}
                                disableElevation
                                onClick={() => navigate("/add-book")}
                            >
                                Add
                            </Button>                            
                        </div>

                    </div>
                </div>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookRecords?.items?.map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>
                                        {categories.find((c) => c.id === row.categoryId)?.name}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            style={{width:"25%"}}
                                            variant="contained"
                                            color="success"
                                            disableElevation
                                            onClick={() => {
                                                navigate(`/edit-book/${row.id}`);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            style={{width:"25%"}}
                                            variant="contained"
                                            color="warning"
                                            disableElevation
                                            onClick={() => {
                                                setOpen(true);
                                                setSelectedId(row.id ?? 0);
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!bookRecords.items.length && (
                                <TableRow className="TableRow">
                                    <TableCell colSpan={5} className="TableCell">
                                        <Typography align="center" className="noDataText">
                                            No Books
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[2, 5, 10, 100]}
                    component="div"                    
                    count={bookRecords.totalItems}
                    rowsPerPage={filters.pageSize || 0}
                    page={filters.pageIndex - 1}
                    onPageChange={(e, newPage) => {
                        setFilters({ ...filters, pageIndex: newPage + 1 });
                    }}
                    onRowsPerPageChange={(e) => {
                        setFilters({
                            ...filters,
                            pageIndex: 1,
                            pageSize: Number(e.target.value),
                        });
                    }}
                />
                <ConfirmationDialog
                    open={open}
                    onClose={() => setOpen(false)}
                    onConfirm={() => onConfirmDelete()}
                    title="Delete book"
                    description="Are you sure you want to delete this book?"
                />
            </div>
        </div >
    )
}
