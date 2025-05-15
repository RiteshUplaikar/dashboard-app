import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './login-page.css';

const LoginPage = () => {
  const initialValues = {
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Form data', values);
  };

  return (
    <div className="login-container">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="login-form">
          <h2>Login</h2>

          <label htmlFor="email">Email</label>
          <Field type="email" id="email" name="email" placeholder="Enter your email" />
          <ErrorMessage name="email" component="div" className="error" />

          <label htmlFor="password">Password</label>
          <Field type="password" id="password" name="password" placeholder="Enter your password" />
          <ErrorMessage name="password" component="div" className="error" />

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <span>Don't have an account? </span>
            <a href="/register">Register</a>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
