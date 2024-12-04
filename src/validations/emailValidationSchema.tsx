import * as yup from 'yup';

const emailValidationSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Invalid email')
        .test('is-gmail', 'Email must end with @gmail.com', (value) => {
            return value ? value.endsWith('@gmail.com') : false;
        })
});

export default emailValidationSchema;
