import { Button, Grid, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { editCategorySchema } from '../schemas';
import categoryService from '../services/category.service';
import { toast } from 'react-toastify';
import BookContext from '../context/BookContext';

export default function EditCategory() {

    const context = useContext(BookContext);

    const navigate = useNavigate();

    const initialValues = {
        name:""
    }

    const {id} = useParams();

    useEffect(() => {        
        if(id) getCategoryById();
        // eslint-disable-next-line
    },[id])

    const [initialValueState,setInitialValueState] = useState(initialValues);

    const getCategoryById = () => {
        context.setLoading(true);
        categoryService.getById(Number(id)).then((res) => {            
            // console.log(res);
            setInitialValueState({
                id:res.id,
                name:res.name
            });
            context.setLoading(false);
        })
    }

    const onSubmit = (values) => {
        categoryService.save(values).then((res) => {
            toast.success(
                values.id
                ?"Record updated successfully"
                :"Record created successfully"
            )
            navigate("/category")
        })
        .catch((err) => toast.error("Record cannot be updated"))
    }

    return (
        <div className='container' style={{ padding: "3%" }}>
            <Typography variant='h4' className='title'>Edit Category</Typography>

            <Formik
                initialValues={initialValueState}
                validationSchema={editCategorySchema}
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
                            <Grid spacing={4} container style={{textAlign:"left",padding:"3%"}}>
                                <Grid item md={6} xs={12}>
                                    <p>Category Name *</p>
                                    <TextField
                                        id='name'
                                        name='name'
                                        fullWidth
                                        value={values.name}
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
                                        (errors.name && touched.name) &&
                                        <Typography variant='body2' color={"red"} > {errors.name} </Typography>
                                    }
                                </Grid>                                                                

                                <Grid item md={12} xs={12}>                                    
                                    <Button
                                        variant='contained'
                                        color='success'
                                        type='submit'
                                        style={{ width: "10%" }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='warning'
                                        style={{ width: "10%", marginLeft: "2%" }}
                                        onClick={() => { navigate('/category') }}
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
