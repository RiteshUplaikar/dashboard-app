import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRegisterUser } from './hooks';

interface RegisterFormProps {
    visible: boolean;
    onClose: () => void;
    title: string;
}

const validationSchema = Yup.object({
    name: Yup.string()
        .min(20, 'Name must be at least 20 characters')
        .max(60, 'Name cannot exceed 60 characters')
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(16, 'Password must be at most 16 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),
    address: Yup.string()
        .max(400, 'Address cannot exceed 400 characters')
        .required('Address is required'),
});

const RegisterForm: React.FC<RegisterFormProps> = ({ visible, onClose, title }) => {

    const { isLoading, handleCreateUser } = useRegisterUser()
    if (!visible) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button onClick={onClose} style={styles.closeButton}>X</button>
                <h2 style={styles.heading}>{title}</h2>
                <Formik
                    initialValues={{ name: '', email: '', password: '', address: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log('Form submitted:', values);
                        handleCreateUser(values)
                        alert('User registered successfully!');
                        onClose();
                    }}
                >
                    {({ errors, touched }) => (
                        <Form style={styles.form}>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Name</label>
                                <Field type="text" name="name" style={styles.input} />
                                {errors.name && touched.name && <div style={styles.error}>{errors.name}</div>}
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Email</label>
                                <Field type="email" name="email" style={styles.input} />
                                {errors.email && touched.email && <div style={styles.error}>{errors.email}</div>}
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Password</label>
                                <Field type="password" name="password" style={styles.input} />
                                {errors.password && touched.password && <div style={styles.error}>{errors.password}</div>}
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Address</label>
                                <Field as="textarea" name="address" style={{ ...styles.input, height: '80px' }} />
                                {errors.address && touched.address && <div style={styles.error}>{errors.address}</div>}
                            </div>

                            <button type="submit" style={styles.button}>
                                {
                                    isLoading ? <p>Loading</p> : <p>Register</p>
                                }
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#f9f9fb',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '500px',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: '#333',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '24px',
        fontWeight: '600',
        color: '#2c3e50',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    fieldGroup: {
        marginBottom: '18px',
    },
    label: {
        fontSize: '14px',
        marginBottom: '6px',
        color: '#555',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        fontSize: '15px',
    },
    error: {
        color: 'crimson',
        fontSize: '13px',
        marginTop: '4px',
    },
    button: {
        padding: '12px',
        backgroundColor: '#2575fc',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        fontWeight: '600',
        transition: 'background 0.3s',
    },
};

export default RegisterForm;
