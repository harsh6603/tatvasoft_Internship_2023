import * as Yup from "yup"

export const registerSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please enter your first name"),
    lastName: Yup.string().min(2).max(25).required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    roleId: Yup.number().required("Please select your role"),
    password: Yup.string().min(8).required("Please enter your password"),
    confirmPassword: Yup.string()
        .required("Please enter your confirm password")
        .oneOf([Yup.ref("password"), null], "Password not match"),
});

export const loginSchema = Yup.object({
    email: Yup.string().email().required("Please enter an email"),
    password: Yup.string().min(8).required("Please enter a password")
});

export const bookSchema = Yup.object({
    search: Yup.string().required("Please enter name of book.")
})

export const editBookSchema = Yup.object({
    name: Yup.string().required("Book Name is required"),
    description: Yup.string().required("Description is required"),
    categoryId: Yup.number()
        .min(1, "Category is required")
        .required("Category is required"),
    price: Yup.number().required("Price is required"),
    base64image: Yup.string().required("Image is required"),
})

export const editUserSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    roleId: Yup.number().required("Role is required"),
});

export const editCategorySchema = Yup.object().shape({
    name:Yup.string().required("Category name is required")
})