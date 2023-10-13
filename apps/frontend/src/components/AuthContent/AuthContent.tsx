import './style.scss';

import type { FC } from 'react';

import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

interface IFormProps {
  username: string;
  password: string;
}

interface IProps {
  handleOpen: () => void;
}

interface IAuthResponse {
  statusText: string;
}

const SigninSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too short username').required('required'),
  password: Yup.string().min(2, 'Too short password').required('required')
});

export const AuthContent: FC<IProps> = (props) => {
  const { handleOpen } = props;

  const submitForm = async (values: IFormProps) => {
    const response = await axios.post<IAuthResponse>(
      `${import.meta.env.VITE_API_URL}/sign-up`,
      values
    );

    if (response.statusText === 'OK') {
      alert('successful');
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SigninSchema}
      onSubmit={submitForm}>
      {({ errors }) => (
        <Form className="auth-wrapper">
          <button className="close-modal" onClick={handleOpen}>
            X
          </button>

          <div className="auth-wrapper__inputs">
            <div className="auth-wrapper__input">
              <label htmlFor="username">USERNAME</label>
              <Field className="username" id="username" name="username" />
              {errors.username ? <div className="input-error">{errors.username}</div> : null}
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
