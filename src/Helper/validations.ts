import * as Yup from "yup";

const email = Yup.string().required('Email is required').email('Email is invalid');

const password = Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters')

const confirmPassword = Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match')

const firstName = Yup.string()
    .required('FirstName is required')

const lastName = Yup.string()
    .required('LastName is required')

const address = Yup.string()
    .required('Address is required')

export const registerValidations = Yup.object().shape({
    email: email,
    password: password,
    confirmPassword: confirmPassword

});

export const loginValidations = Yup.object().shape({
    email: email,
    password: password,
});

export const addUserValidations = Yup.object().shape({
    firstName: firstName,
    lastName: lastName,
    email: email,
    address: address,
    password: password,
    confirmPassword: confirmPassword
});