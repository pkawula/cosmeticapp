import React, { useState, useReducer } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { routes } from 'routes';
import Spinner from 'components/atoms/Spinner/Spinner';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import Link from 'components/atoms/Link/Link';
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

  const history = useHistory();

  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
      name: '',
      company: '',
      repeatPassword: '',
    },
  );

  const handleChange = e => {
    const type = e.target.name;
    const { value } = e.target;

    setInputValues({ [type]: value });
  };

  const logIn = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await auth.signInWithEmailAndPassword(inputValues.email, inputValues.password);
      history.push(routes.home);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const signUp = e => {
    e.preventDefault();
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
                <Link as={RouterLink} to={routes.resetPassword}>
                  Reset password
                </Link>
                <br />
                Don&apos;t have an account?{' '}
                <Link as={RouterLink} to={routes.register}>
                  Register
                </Link>
              </ForgetMessage>
            </Form>
          )}
        </>
      ) : (
        <Form onSubmit={signUp}>
          <FormTitle>Create new account</FormTitle>
          <InputField
            type="text"
            placeholder="Your name"
            name="name"
            value={inputValues.name}
            onChange={handleChange}
            autocomplete="name"
          />
          <InputField
            type="text"
            placeholder="Company name"
            name="company"
            value={inputValues.company}
            onChange={handleChange}
            autocomplete="company"
          />
          <InputField
            type="email"
            placeholder="Your email"
            name="email"
            value={inputValues.email}
            onChange={handleChange}
            autocomplete="email"
          />
          <InputField
            type="password"
            placeholder="Your password"
            name="password"
            value={inputValues.password}
            onChange={handleChange}
            autocomplete="password"
          />
          <InputField
            type="password"
            placeholder="Repeat password"
            name="repeatPassword"
            value={inputValues.repeatPassword}
            onChange={handleChange}
            autocomplete="repeat-password"
          />
          <Button>Submit</Button>
          <ForgetMessage>
            Already have an account?{' '}
            <Link as={RouterLink} to={routes.login}>
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
