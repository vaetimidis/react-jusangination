import type { FC } from 'react';
import type { FormikHelpers } from 'formik';
import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import './style.scss';
import axios from 'axios';

interface IFormProps {
  login: string;
  password: string;
}

interface IProps {
  handleOpen: () => void;
}

interface IAuthResponse {
  statusText: string;
}

const SigninSchema = Yup.object().shape({
  login: Yup.string().min(2, 'Too short login').required('required'),
  password: Yup.string().min(2, 'Too short password').required('required')
});

export const AuthContent: FC<IProps> = (props) => {
  const { handleOpen } = props;

  const submitForm = async (values: IFormProps, { setSubmitting }: FormikHelpers<IFormProps>) => {
    const response = await axios.post<IAuthResponse>(`${import.meta.env.VITE_URL}/sign-up`, values);

    if (response.statusText === 'OK') {
      alert('successful');
    }
  };

  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      validationSchema={SigninSchema}
      onSubmit={submitForm}>
      {({ errors }) => (
        <Form className="auth-wrapper">
          <button className="close-modal" onClick={handleOpen}>
            X
          </button>

          <div className="auth-wrapper__inputs">
            <div className="auth-wrapper__input">
              <label htmlFor="login">LOGIN</label>
              <Field className="auth-login" id="login" name="login" />
              {errors.login ? <div className="input-error">{errors.login}</div> : null}
            </div>

            <div className="auth-wrapper__input">
              <label htmlFor="password">PASSWORD</label>
              <Field className="auth-password" id="password" name="password" />
              {errors.password ? <div className="input-error">{errors.password}</div> : null}
            </div>
          </div>
          <div className="auth-wrapper__btns">
            <button className="auth-signin" type="submit">
              Sign up
            </button>
            <button className="auth-signup">Already have profile?</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
