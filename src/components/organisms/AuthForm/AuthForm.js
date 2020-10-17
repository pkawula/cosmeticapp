import React, { useState, useReducer } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from 'components/atoms/Button/Button';
import InputField from 'components/atoms/InputField/InputField';
import Spinner from 'components/atoms/Spinner/Spinner';
import Link from 'components/atoms/Link/Link';
import { Link as RouterLink } from 'react-router-dom';
import { auth } from '../../../firebase';

const Form = styled.form`
  display: block;
  width: 100%;
  max-width: 400px;
  padding: 1em;
  border-radius: 1em;
  background-color: ${({ theme }) => theme.light};
`;

const FormTitle = styled.h2`
  display: block;
  margin-top: 0;
  margin-bottom: 1.5em;
  text-align: center;
  color: ${({ theme }) => theme.black};
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`;

const ForgetMessage = styled.p`
  display: block;
  margin-top: 2em;
  margin-bottom: 0;
  color: ${({ theme }) => theme.lightBlack};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.regular};
`;

const AuthForm = ({ formToDisplay }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
    },
  );

  const handleChange = e => {
    const { type } = e.target;
    const { value } = e.target;

    setInputValues({ [type]: value });
  };

  const logIn = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await auth.signInWithEmailAndPassword(inputValues.email, inputValues.password);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <>
      {formToDisplay === 'login' ? (
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <Form onSubmit={logIn}>
              <FormTitle>Log in</FormTitle>
              <InputField
                autocomplete="current-email"
                onChange={handleChange}
                value={inputValues.email}
                type="email"
                placeholder="Your email"
                name="email"
              />
              <InputField
                autocomplete="current-password"
                onChange={handleChange}
                value={inputValues.password}
                type="password"
                placeholder="Password"
                name="password"
              />
              <Button>Submit</Button>
              <ForgetMessage>
                Forget password?{' '}
                <Link as={RouterLink} to="/register">
                  Reset password
                </Link>
                <br />
                Don&apos;t have an account?{' '}
                <Link as={RouterLink} to="/register">
                  Register
                </Link>
              </ForgetMessage>
            </Form>
          )}
        </>
      ) : (
        <Form>
          <FormTitle>Register new account</FormTitle>
          <InputField
            type="Give this field a name"
            placeholder="Give this field a name"
            name="Give this field a name"
          />
          <InputField
            type="Give this field a name"
            placeholder="Give this field a name"
            name="Give this field a name"
          />
          <InputField
            type="Give this field a name"
            placeholder="Give this field a name"
            name="Give this field a name"
          />
          <InputField
            type="Give this field a name"
            placeholder="Give this field a name"
            name="Give this field a name"
          />
          <Button>Submit</Button>
          <ForgetMessage>
            Already have an account?{' '}
            <Link as={RouterLink} to="/login">
              Login
            </Link>
          </ForgetMessage>
        </Form>
      )}
    </>
  );
};

AuthForm.propTypes = {
  formToDisplay: PropTypes.string,
};

AuthForm.defaultProps = {
  formToDisplay: 'login',
};

export default AuthForm;
