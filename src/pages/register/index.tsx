import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(20, 'Name must be at least 20 characters')
    .max(60, 'Name must be less than or equal to 60 characters')
    .required('Name is required'),
  address: Yup.string()
    .max(400, 'Address cannot exceed 400 characters')
    .required('Address is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be less than or equal to 16 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),
  userType: Yup.string().required('User type is required'),
});

const RegisterPage = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Register</h2>
        <Formik
          initialValues={{
            name: '',
            address: '',
            email: '',
            password: '',
            userType: 'user', // default value
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Form submitted successfully:', values);
          }}
        >
          {() => (
            <Form>
              <div>
                <label htmlFor="name">Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage component="div" className="error" name="name" />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <Field type="text" id="address" name="address" />
                <ErrorMessage component="div" className="error" name="address" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage component="div" className="error" name="email" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage component="div" className="error" name="password" />
              </div>
              <div className="role-select">
                <label htmlFor="userType">User Type</label>
                <Field as="select" id="userType" name="userType">
                  <option value="user">User</option>
                  <option value="storeOwner">Store Owner</option>
                </Field>
                <ErrorMessage component="div" className="error" name="userType" />
              </div>
              <button type="submit">Register</button>
            </Form>
          )}
        </Formik>
        <div className="register-link">
          <p>Already have an account? <a href="/">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
