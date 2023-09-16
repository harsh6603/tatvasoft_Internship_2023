import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ConfirmationDialog from './ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user.service';
import BookContext from '../context/BookContext';
import { toast } from 'react-toastify';

export default function User() {

    const context = useContext(BookContext);

    const [filters, setFilters] = useState({
        pageIndex: 1,
        pageSize: 10,
        keyword: "",
    });
    const [userList, setUserList] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        context.setLoading(true);
        
        //if user not login
        if(!localStorage.getItem("firstName")) {
            navigate("/login");
        }
        
        //if user login but user is not seller then do not give access 
        if(localStorage.getItem("roleId")==='1')
        {
            
        }
        else
        {
            toast.warning("Sorry, you are not authorized to access this page");
            navigate("/"); 
            context.setLoading(false);                               
        }                
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        const timer = setTimeout(() => {
            context.setLoading(true);
            if (filters.keyword === "") delete filters.keyword;
            getAllUsers({ ...filters });
        }, 500);
        return () => clearTimeout(timer);

        // eslint-disable-next-line        
    }, [filters]);

    const getAllUsers = async (filters) => {
        await userService.getAllUsers(filters).then((res) => {
            if (res) {
                setUserList(res);
                context.setLoading(false);
            }
        });
    };

    const columns = [
        { id: "firstName", label: "First Name", minWidth: 100 },
        { id: "lastName", label: "Last Name", minWidth: 100 },
        {
            id: "email",
            label: "Email",
            minWidth: 170,
        },
        {
            id: "roleName",
            label: "Role",
            minWidth: 130,
        },
    ];

    const onConfirmDelete = async () => {
        await userService
            .deleteUser(selectedId)
            .then((res) => {
                if (res) {
                    toast.success("Record deleted successfully");
                    setOpen(false);
                    setFilters({ ...filters });
                }
            })
            .catch((e) => toast.error("Record cannot be deleted"));
    };

    return (
        <div style={{ padding: "3% 0" }}>
            <div className="container">
                <Typography variant='h4' className='title'>User</Typography>
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
                                style={{ backgroundColor: "white", border: "1px solid gainsboro", width: "50%" }}
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
                            {userList?.items?.map((row, index) => (                                
                                <TableRow key={row._id}>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.role}</TableCell>                                    
                                    <TableCell>
                                        {
                                            (row._id !== localStorage.getItem("_id"))&&
                                            <Button
                                                type="button"
                                                style={{ width: "25%" }}
                                                variant="contained"
                                                color="success"
                                                disableElevation
                                                onClick={() => {
                                                    navigate(`/edit-user/${row.id}`);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="button"
                                            style={{ width: "25%" }}
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
                            {!userList.items.length && (
                                <TableRow className="TableRow">
                                    <TableCell colSpan={5} className="TableCell">
                                        <Typography align="center" className="noDataText">
                                            No User
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
                    count={userList.totalItems}
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
                    title="Delete user"
                    description="Are you sure you want to delete this user?"
                />
            </div>
        </div>
    )
}
