import './style.scss';
import { useRef, type FC, useEffect } from 'react';

import { notification } from 'antd';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { api } from '#/utils/api';

export interface IFormProps {
  username: string;
  password: string;
}

interface IProps {
  handleOpen: () => void;
}

export interface IAuthResponse {
  statusText: string;
}

const openNotification = () => {
  notification.open({
    message: 'Успешно!',
    description: 'Вы были успешно зарегестрированы',
    onClick: () => {
      console.log('Notification Clicked!');
    }
  });
};

const SigninSchema = Yup.object().shape({
  username: Yup.string().min(2, 'Too short username').required('required'),
  password: Yup.string().min(2, 'Too short password').required('required')
});

export const AuthContent: FC<IProps> = (props) => {
  const { handleOpen } = props;
  const modalRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleOpen();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleOpen]);

  const submitForm = async (values: IFormProps) => {
    try {
      await api.auth.signIn(values);

      openNotification();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SigninSchema}
      onSubmit={submitForm}>
      {({ errors }) => (
        <Form ref={modalRef} className="auth-wrapper">
          <button className="close-modal" onClick={handleOpen}>
            X
          </button>

          <div className="auth-wrapper__inputs">
            <div className="auth-wrapper__input">
              <label htmlFor="username">USERNAME</label>
              <Field className="auth-username" id="username" name="username" />
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
