import { Button, Container, Grid, List, ListItem, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { loginSchema } from '../schemas'
import authService from '../services/auth.service'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import BookContext from '../context/BookContext'

const initialValues = {
    email:"",
    password:"",
}

export default function Login() {

    const context = useContext(BookContext);

    const navigate = useNavigate();

    const { values,errors,touched,handleBlur,handleSubmit,handleChange } = useFormik({
        initialValues:initialValues,
        validationSchema:loginSchema,

        onSubmit : (values) => {
            // console.log(values);
            
            context.setLoading(true);
            authService.login(values).then((res) => {
                console.log(res);
                res && 
                    toast.success("Login succesfully")
                res && navigate("/");
                if(res!=null)
                {
                    localStorage.setItem("firstName",res.firstName);
                    localStorage.setItem("roleId",res.roleId);
                    localStorage.setItem("_id",res._id);
                    localStorage.setItem("id",res.id);
                }
                context.setLoading(false);
            })
        }
    })

    return (
        <div>
            <Typography variant='h4' className='title' style={{paddingTop:"2%"}}>Login or Create an Account</Typography> 
            <Container>
                <br/><br/>
                <Grid container textAlign="left">
                    <Grid item sm={12} md={6}>
                        <div className='setDiv'>
                            <Typography variant='h6' align='left'>New Consumer</Typography>                            
                            <hr/>
                            <Typography variant='body1' align='left'>Registration is free and easy.</Typography>
                            <List sx={{ listStyleType: 'disc', pl: 2 }}>
                                <ListItem sx={{ display: 'list-item' }}>Faster checkout</ListItem>
                                <ListItem sx={{ display: 'list-item' }}>Save multiple shipping addresses</ListItem>
                                <ListItem sx={{ display: 'list-item' }}>View and track orders and more</ListItem>
                            </List>                                                        
                        </div>                        
                        <Link className='linkBtn' to='/register'>Create an Account</Link>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <div className='setDiv1'>
                            <Typography variant='h6' align='left'>Registered Customer</Typography>
                            <hr/>
                            <Typography variant='body1' align='left'>If you have an account with us, please log in.</Typography>                            
                            <form noValidate onSubmit={handleSubmit}>                                
                                <Typography className='label' variant='body1' align='left'>Email * </Typography>
                                <TextField
                                    className='inputField'                                                           
                                    type='email'
                                    variant='standard'                                
                                    name='email'
                                    id='email'
                                    required
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    (errors.email && touched.email) &&                                
                                    <Typography variant='body2' color={"red"} > {errors.email} </Typography>
                                }

                                <Typography className='label' variant='body1' align='left'>Password * </Typography>
                                <TextField
                                    className='inputField'
                                    type='password'
                                    variant='standard'
                                    name='password'
                                    id='password'
                                    required
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    (errors.password && touched.password) &&                                
                                    <Typography variant='body2' color={"red"} > {errors.password} </Typography>
                                } 

                                <Button type='submit' color='warning' variant='contained' style={{margin:"5% 0",textTransform:"capitalize",padding:"1% 6%",fontSize:"15px"}}> Login </Button>
                            </form>
                        </div>
                    </Grid> 
                </Grid> 
            </Container>
        </div>
    )
}
