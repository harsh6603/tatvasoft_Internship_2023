import React, { useContext } from 'react'
import "../css/Registration.css"
import { Button, Container, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import { registerSchema } from '../schemas'
import authService from '../services/auth.service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import BookContext from '../context/BookContext'

const initialValues = {
    firstName:"",
    lastName:"",
    email:"",
    roleId:"",
    password:"",
    confirmPassword:""
}

export default function Registration() {

    const navigate = useNavigate();

    const context = useContext(BookContext);

    const {values,errors,touched,handleBlur,handleSubmit,handleChange} = useFormik({
        initialValues:initialValues,
        validationSchema:registerSchema,
        onSubmit : (values) => {            
            console.log("Here",values);

            context.setLoading(true);

            delete values.confirmPassword;                           
            
            authService.create(values).then((res) => {
                console.log(res);
                toast.success("Successfully registered.")
                navigate("/login");
                context.setLoading(false);
            })
        }        
    })
    // console.log(values)
    // console.log(touched);
    // console.log(errors);
    return (
        <div>
            <Typography variant='h4' className='title' style={{paddingTop:"2%"}}>Login or Create an Account</Typography> 
            <Container>
                <form noValidate onSubmit={handleSubmit}>
                    <Typography className='titleText' variant='h6'>Personal Information</Typography>
                    <hr/>
                    <Grid container textAlign="left">
                        <Grid className={"contentSpacingRight"} item xs={12} md={6}>
                            <Typography className={"label"} variant='body1' align='left'>First Name *</Typography>
                            <TextField     
                                className='inputField'                                                           
                                type='text'
                                variant='standard'                                
                                name='firstName'
                                id='firstName'
                                required                                                                                       
                                value={values.firstName}         
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />                            
                            {
                                (errors.firstName && touched.firstName) &&                                
                                <Typography variant='body2' color={"red"} > {errors.firstName} </Typography>
                            }
                        </Grid>
                        <Grid className={"contentSpacingLeft"} item xs={12} md={6}>
                            <Typography className={"label"} variant='body1' align='left'>Last Name *</Typography>
                            <TextField
                                className='inputField'                                                           
                                type='text'
                                variant='standard'                                
                                name='lastName'
                                id='lastName'
                                required                             
                                value={values.lastName}         
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {
                                (errors.lastName && touched.lastName) &&                                
                                <Typography variant='body2' color={"red"} > {errors.lastName} </Typography>
                            }
                        </Grid>
                        <Grid className={"contentSpacingRight"} item xs={12} md={6}>
                            <Typography className={"label"} variant='body1' align='left'>Email *</Typography>
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
                        </Grid>
                        <Grid className={"contentSpacingLeft"} item xs={12} md={6}>
                            <Typography className={"label"} variant='body1' align='left'>Role *</Typography>
                            <Select
                                className='selectField'                            
                                variant='standard'     
                                name='roleId'
                                id='roleId'                                                                                           
                                required
                                value={values.roleId}
                                onChange={handleChange}
                                onBlur={handleBlur}                                
                            >                                
                                <MenuItem value={2}>seller</MenuItem>
                                <MenuItem value={3}>buyer</MenuItem>                                
                            </Select>
                            {/* <TextField
                                className='inputField'                                                           
                                type='number'
                                variant='standard'                                
                                name='contact'
                                id='contact'
                                required                             
                                value={values.contact}         
                                onChange={handleChange}
                                onBlur={handleBlur}                     
                            /> */}
                            {
                                (errors.roleId && touched.roleId) &&                                
                                <Typography variant='body2' color={"red"} > {errors.roleId} </Typography>
                            }
                        </Grid>
                    </Grid>

                    <Typography className='titleText' variant='h6'>Login Information</Typography>
                    <hr/>
                    
                    <Grid container textAlign="left">
                        <Grid className={"contentSpacingRight"} item xs={12} md={6}>
                            <Typography className={"label"} variant='body1' align='left'>Password *</Typography>
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
                        </Grid>
                        <Grid className={"contentSpacingLeft"} item xs={12} md={6}>
                            <Typography className={"label"} variant='body1' align='left'>Confirm Password *</Typography>
                            <TextField
                                className='inputField'                                                           
                                type='password'
                                variant='standard'                                
                                name='confirmPassword'
                                id='confirmPassword'
                                required                                 
                                value={values.confirmPassword}         
                                onChange={handleChange}
                                onBlur={handleBlur}                     
                            />
                            {
                                (errors.confirmPassword && touched.confirmPassword) &&                                
                                <Typography variant='body2' color={"red"} > {errors.confirmPassword} </Typography>
                            }
                        </Grid>                        

                        <Button style={{margin:"5% 0",padding:"1% 3%",fontSize:"15px"}} variant='contained' color='warning' type='submit'>Register</Button>

                    </Grid>
                </form>                
            </Container>
        </div>
    )
}
