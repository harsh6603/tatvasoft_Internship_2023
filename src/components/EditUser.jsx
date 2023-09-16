import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { editUserSchema } from '../schemas';
import BookContext from '../context/BookContext';

export default function EditUser() {

    const navigate = useNavigate();

    const initialValues = {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        roleId: "",
    };

    const context = useContext(BookContext);

    const { id } = useParams();

    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState();
    const [initialValueState, setInitialValueState] = useState(initialValues);

    useEffect(() => {
        getRoles();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (id)
            getUserById();

        console.log(user);
        // eslint-disable-next-line
    }, [id])

    useEffect(() => {
        
        if (user && roles.length) {
            const roleId = roles.find((role) => role.name === user.role)?.id;

            setInitialValueState({
                id: user.id,
                email: user.email,
                lastName: user.lastName,
                firstName: user.firstName,
                roleId:roleId,
                password: user.password,
            })
        }
        // eslint-disable-next-line
    }, [user, roles])

    const getRoles = () => {
        context.setLoading(true);
        userService.getAllRoles().then((res) => {
            console.log(res);
            if (res)
                setRoles(res);

            context.setLoading(false);
        })
    }

    const getUserById = () => {
        context.setLoading(true);
        userService.getById(Number(id)).then((res) => {
            console.log(res);
            if (res)
                setUser(res);

            context.setLoading(false)
        })
    }

    const onSubmit = (values) => {
        const updatedValue = {
            ...values,
            role: roles.find((r) => r.id === values.roleId).name,
        };

        userService.update(updatedValue).then((res) => {
            if(res)
            {
                toast.success("Record updated successfully");
                navigate("/user");
            }
        })
        .catch((e) => toast.error("Record cannot be updated"))
    }

    return (
        <div className='container' style={{ padding: "3%" }}>
            <Typography variant='h4' className='title'>Edit User</Typography>

            <Formik
                initialValues={initialValueState}
                validationSchema={editUserSchema}
                enableReinitialize={true}
                onSubmit={onSubmit}
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit
                    }) => (
                        <form onSubmit={handleSubmit}>

                            <Grid container spacing={4} style={{ textAlign: "left", padding: "3%" }}>
                                <Grid item md={6} xs={12}>
                                    <p>First Name *</p>
                                    <TextField
                                        id='firstName'
                                        name='firstName'
                                        fullWidth
                                        value={values.firstName}
                                        style={{ border: "1px solid gainsboro" }}
                                        inputProps={{
                                            style: {
                                                padding: 7,
                                            }
                                        }}
                                        sx={{
                                            "& fieldset": { border: 'none' },
                                        }}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {
                                        (errors.firstName && touched.firstName) &&
                                        <Typography variant='body2' color={"red"} > {errors.firstName} </Typography>
                                    }
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <p>Last Name *</p>
                                    <TextField
                                        id='lastName'
                                        name='lastName'
                                        fullWidth
                                        value={values.lastName}
                                        style={{ border: "1px solid gainsboro" }}
                                        inputProps={{
                                            style: {
                                                padding: 7,
                                            }
                                        }}
                                        sx={{
                                            "& fieldset": { border: 'none' },
                                        }}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {
                                        (errors.lastName && touched.lastName) &&
                                        <Typography variant='body2' color={"red"} > {errors.lastName} </Typography>
                                    }
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <p>Email *</p>
                                    <TextField
                                        id='email'
                                        name='email'
                                        fullWidth
                                        value={values.email}
                                        style={{ border: "1px solid gainsboro" }}
                                        inputProps={{
                                            style: {
                                                padding: 7,
                                            }
                                        }}
                                        sx={{
                                            "& fieldset": { border: 'none' },
                                        }}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {
                                        (errors.email && touched.email) &&
                                        <Typography variant='body2' color={"red"} > {errors.email} </Typography>
                                    }
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <p>Roles *</p>
                                    <Select
                                        name={"roleId"}
                                        id={"roleId"}
                                        fullWidth
                                        value={values.roleId}
                                        style={{ border: "1px solid gainsboro" }}
                                        SelectDisplayProps={{
                                            style: {
                                                padding: 7,
                                            }
                                        }}
                                        sx={{
                                            "& fieldset": { border: 'none' },
                                        }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {roles.length > 0 &&
                                        roles.map((role) => (
                                            <MenuItem value={role.id} key={"name" + role.id}>
                                                {role.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {
                                        (errors.roleId && touched.roleId) &&
                                        <Typography variant='body2' color={"red"} > {errors.roleId} </Typography>
                                    }
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <Button
                                        variant='contained'
                                        color='success'
                                        type='submit'
                                        style={{ width: "15%" }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='warning'
                                        style={{ width: "15%", marginLeft: "5%" }}
                                        onClick={() => { navigate('/user') }}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>

                            </Grid>

                        </form>
                    )
                }

            </Formik>
        </div>
    )
}
