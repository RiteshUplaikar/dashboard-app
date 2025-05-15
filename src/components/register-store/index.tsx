import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useRegisterStoreForm } from './hooks';

interface User {
    id: string;
    name: string;
    email: string;
}

interface RegisterStoreFormProps {
    visible: boolean;
    onClose: () => void;
    title: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Store name is required'),
    address: Yup.string().required('Address is required'),
    description: Yup.string(),
    imageUrl: Yup.string().url('Invalid URL'),
    ownerId: Yup.string(),
    createNewOwner: Yup.boolean(),
    newOwnerName: Yup.string().when('createNewOwner', (createNewOwner, schema) =>
        createNewOwner ? schema.required('Owner name is required') : schema.notRequired()
    ),
    newOwnerEmail: Yup.string().when('createNewOwner', (createNewOwner, schema) =>
        createNewOwner ? schema.email('Invalid email').required('Owner email is required') : schema.notRequired()
    ),
    newOwnerPassword: Yup.string().when('createNewOwner', (createNewOwner, schema) =>
        createNewOwner ? schema.min(6, 'Password too short').required('Password is required') : schema.notRequired()
    ),
    newOwnerAddress: Yup.string().when('createNewOwner', (createNewOwner, schema) =>
        createNewOwner ? schema.required('Owner address is required') : schema.notRequired()
    ),
});

const RegisterStoreForm: React.FC<RegisterStoreFormProps> = ({
    visible,
    onClose,
    title,
}) => {
    const { isLoading, handleCreateStore } = useRegisterStoreForm();
    if (!visible) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button onClick={onClose} style={styles.closeButton}>X</button>
                <h2 style={styles.heading}>{title}</h2>
                <Formik
                    initialValues={{
                        name: '',
                        address: '',
                        description: '',
                        imageUrl: '',
                        ownerId: '',
                        createNewOwner: true,
                        newOwnerName: '',
                        newOwnerEmail: '',
                        newOwnerPassword: '',
                        newOwnerAddress: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleCreateStore(values)
                        alert('Store registered successfully!');
                        onClose();
                    }}
                >
                    {({ errors, touched, values, setFieldValue }) => (
                        <Form style={styles.form}>
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Store Name</label>
                                <Field name="name" style={styles.input} />
                                {errors.name && touched.name && <div style={styles.error}>{errors.name}</div>}
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Address</label>
                                <Field name="address" style={styles.input} />
                                {errors.address && touched.address && <div style={styles.error}>{errors.address}</div>}
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Description</label>
                                <Field name="description" style={styles.input} />
                            </div>

                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>Image URL</label>
                                <Field name="imageUrl" style={styles.input} />
                                {errors.imageUrl && touched.imageUrl && <div style={styles.error}>{errors.imageUrl}</div>}
                            </div>

                            <div style={{ ...styles.fieldGroup, marginBottom: '8px' }}>
                                <label style={{ ...styles.label, display: 'inline-flex', alignItems: 'center' }}>
                                    <Field
                                        type="checkbox"
                                        name="createNewOwner"
                                        checked={values.createNewOwner}
                                        onChange={() => setFieldValue('createNewOwner', !values.createNewOwner)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    Create New Owner
                                </label>
                            </div>

                            {!values.createNewOwner && (
                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Owner</label>
                                    {errors.ownerId && touched.ownerId && (
                                        <div style={styles.error}>{errors.ownerId}</div>
                                    )}
                                </div>
                            )}

                            <>
                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Owner Name</label>
                                    <Field name="newOwnerName" style={styles.input} />
                                    {errors.newOwnerName && touched.newOwnerName && (
                                        <div style={styles.error}>{errors.newOwnerName}</div>
                                    )}
                                </div>

                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Owner Email</label>
                                    <Field name="newOwnerEmail" type="email" style={styles.input} />
                                    {errors.newOwnerEmail && touched.newOwnerEmail && (
                                        <div style={styles.error}>{errors.newOwnerEmail}</div>
                                    )}
                                </div>

                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Owner Password</label>
                                    <Field name="newOwnerPassword" type="password" style={styles.input} />
                                    {errors.newOwnerPassword && touched.newOwnerPassword && (
                                        <div style={styles.error}>{errors.newOwnerPassword}</div>
                                    )}
                                </div>

                                <div style={styles.fieldGroup}>
                                    <label style={styles.label}>Owner Address</label>
                                    <Field name="newOwnerAddress" style={styles.input} />
                                    {errors.newOwnerAddress && touched.newOwnerAddress && (
                                        <div style={styles.error}>{errors.newOwnerAddress}</div>
                                    )}
                                </div>
                            </>

                            <button type="submit" style={styles.button}>
                                Register Store
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
        padding: '20px',
        boxSizing: 'border-box',
    },
    modal: {
        backgroundColor: '#f9f9fb',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '500px',
        maxHeight: '90vh',         // ✅ Added
        overflowY: 'auto',         // ✅ Added
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
    },
};

export default RegisterStoreForm;
