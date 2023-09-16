import { Button, Grid, Input, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import "../css/EditBook.css"
import { useNavigate, useParams } from 'react-router-dom';
import categoryService from '../services/category.service';
import bookService from '../services/book.service';
import { Formik } from 'formik';
import { editBookSchema } from '../schemas';
import { toast } from 'react-toastify';
import BookContext from '../context/BookContext';

export default function EditBook() {

    const context = useContext(BookContext);

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const initialValues = {
        name: "",
        price: "",
        categoryId: "",
        description: "",
        base64image: "",
    };
    const [initialValueState, setInitialValueState] = useState(initialValues);
    const { id } = useParams();

    useEffect(() => {
        context.setLoading(true);
        if (id) getBookById();
        categoryService.getAll().then((res) => {
            setCategories(res);
            context.setLoading(false);
        });
        // eslint-disable-next-line
    }, [id]);

    const getBookById = () => {        
        bookService.getById(Number(id)).then((res) => {
            console.log(res);
            setInitialValueState({
                id: res.id,
                name: res.name,
                price: res.price,
                categoryId: res.categoryId,
                description: res.description,
                base64image: res.base64image,
            });            
        });
    };

    const onSelectFile = (e, setFieldValue, setFieldError) => {
        const files = e.target.files;
        if (files?.length) {
            const fileSelected = e.target.files[0];
            const fileNameArray = fileSelected.name.split(".");
            const extension = fileNameArray.pop();
            if (["png", "jpg", "jpeg"].includes(extension?.toLowerCase())) {
                if (fileSelected.size > 50000) {
                    toast.error("File size must be less then 50KB");
                    return;
                }
                const reader = new FileReader();
                reader.readAsDataURL(fileSelected);
                reader.onload = function () {
                    setFieldValue("base64image", reader.result);
                };
                reader.onerror = function (error) {
                    throw error;
                };
            } else {
                toast.error("only jpg,jpeg and png files are allowed");
            }
        } else {
            setFieldValue("base64image", "");
        }
    };

    const onSubmit = (values) => {
        context.setLoading(true);
        bookService
            .save(values)
            .then((res) => {
                toast.success(
                    values.id
                        ? "Record updated successfully"
                        : "Record created successfully"
                );
                navigate("/book");
                context.setLoading(false);
            })
            .catch((e) => toast.error("Record cannot be updated"));
    }

    

    return (
        <div className='container' style={{ padding: "3%" }}>
            <Typography variant='h4' className='title'>Edit Book</Typography>
            <Formik
                initialValues={initialValueState}
                validationSchema={editBookSchema}
                enableReinitialize={true}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,                    
                    setFieldError,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4} style={{ textAlign: "left", padding: "3%" }}>
                            <Grid item md={6} xs={12}>
                                <p>Book Name *</p>
                                <TextField
                                    id='name'
                                    name='name'
                                    fullWidth
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
                                    value={values.name}
                                />
                                {
                                    (errors.name && touched.name) &&
                                    <Typography variant='body2' color={"red"} > {errors.name} </Typography>
                                }
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <p>Book Price(RS) *</p>
                                <TextField
                                    id='price'
                                    name='price'
                                    fullWidth
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
                                    value={values.price}
                                />
                                {
                                    (errors.price && touched.price) &&
                                    <Typography variant='body2' color={"red"} > {errors.price} </Typography>
                                }
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <p>Category *</p>
                                <Select
                                    name={"categoryId"}
                                    id={"category"}
                                    fullWidth
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
                                    value={values.categoryId}
                                >
                                    {categories?.map((rl) => (
                                        <MenuItem value={rl.id} key={"category" + rl.id}>
                                            {rl.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {
                                    (errors.categoryId && touched.categoryId) &&
                                    <Typography variant='body2' color={"red"} > {errors.categoryId} </Typography>
                                }
                            </Grid>
                            <Grid item md={6} xs={12} style={{height:"0"}}>
                                <p style={{ color: "white" }}>empty</p>
                                {!values.base64image && (
                                    <>
                                        {" "}
                                        <label
                                            htmlFor="contained-button-file"
                                            style={{ width: "100%",height:"33%" }}
                                            className="file-upload-btn"
                                        >
                                            <Input
                                                id="contained-button-file"
                                                type="file"
                                                fullWidth
                                                disableUnderline
                                                style={{ border: "1px solid gainsboro" }}
                                                // inputProps={{ className: "small" }}
                                                inputProps={{
                                                    style: {
                                                        padding: 4,
                                                        height: "100%",
                                                    }
                                                }}
                                                sx={{
                                                    "& fieldset": { border: 'none' },
                                                }}
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    onSelectFile(e, setFieldValue, setFieldError);
                                                }}
                                            />
                                            <Button
                                                variant="contained"
                                                // component="span"
                                                className='uploadBtn'
                                                color="warning"
                                            >
                                                Upload
                                            </Button>
                                        </label>
                                        {
                                            (errors.base64image && touched.base64image) &&
                                            <Typography variant='body2' color={"red"} > {errors.base64image} </Typography>
                                        }
                                    </>
                                )}
                                {values.base64image && (
                                    <div className="uploadedImage">
                                        <em>
                                            <img style={{width:"4%",height:"5%"}} src={values.base64image} alt="" />
                                        </em>
                                        image{" "}
                                        <span
                                            style={{cursor:"pointer"}}
                                            onClick={() => {
                                                setFieldValue("base64image", "");
                                            }}
                                        >
                                            x
                                        </span>
                                    </div>
                                )}
                            </Grid>
                            <Grid item md={12} xs={12} style={{  }}>
                                <p>Description *</p>
                                <TextField
                                    id='description'
                                    name='description'
                                    value={values.description}
                                    multiline
                                    fullWidth
                                    style={{ border: "1px solid gainsboro" }}
                                    inputProps={{
                                        style: {
                                            height: "10%"
                                        }
                                    }}
                                    sx={{
                                        "& fieldset": { border: 'none' },
                                    }}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />

                                {
                                    (errors.description && touched.description) &&
                                    <Typography variant='body2' color={"red"} > {errors.description} </Typography>
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
                                    onClick={() => { navigate('/book') }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </div>
    )
}
