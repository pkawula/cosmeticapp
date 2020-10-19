import React, { useState, useReducer, useEffect } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { routes } from 'routes';
import { v4 as uuid } from 'uuid';
import Spinner from 'components/atoms/Spinner/Spinner';
import InputField from 'components/atoms/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import Link from 'components/atoms/Link/Link';
import { auth, db } from '../../../firebase';

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

const StyledServerError = styled.p`
  display: block;
  margin: 0 auto 1em;
  width: 100%;
  background-color: ${({ theme }) => theme.cancel};
  color: ${({ theme }) => theme.light};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  border-radius: 1em;
  padding: 0.5em 1em;
`;

const StyledButton = styled(Button)`
  margin: 2em auto 0;
  display: block;
`;

const AuthForm = ({ formToDisplay }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const history = useHistory();
  const location = useLocation();

  useEffect(() => setServerError(''), [location]);

  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]+)\])/;

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

  const [inputErrors, setInputErrors] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
      name: '',
      company: '',
      repeatPassword: '',
    },
  );

  const serverErrors = {
    wrongPassword: 'auth/wrong-password',
    userNotFound: 'auth/user-not-found',
  };

  const handleServerErrors = (error, message) => {
    switch (error) {
      case serverErrors.wrongPassword:
        return setServerError('Wrong password, please try again');
      case serverErrors.userNotFound:
        return setServerError(
          "It seems like wrong email adrress. If don't have account, register below",
        );
      default:
        return setServerError(message);
    }
  };

  const validateFields = fieldTypes => {
    let hasErrors = false;

    fieldTypes.forEach(fieldType => {
      switch (fieldType) {
        case 'email':
          if (!inputValues[fieldType].match(regex)) {
            setInputErrors({ [fieldType]: 'Your email is invalid' });
            hasErrors = true;
          }
          break;
        case 'name':
        case 'company':
          if (inputValues[fieldType].trim() === '') {
            setInputErrors({ [fieldType]: `The ${fieldType} is required` });
            hasErrors = true;
          }
          break;
        case 'password':
          if (inputValues[fieldType].trim().length < 6) {
            setInputErrors({ [fieldType]: 'Your password has to be at least 6 characters long' });
            hasErrors = true;
          }
          break;
        case 'repeatPassword':
          if (inputValues[fieldType] !== inputValues.password || inputValues[fieldType] === '') {
            setInputErrors({ [fieldType]: 'Passwords are different' });
            hasErrors = true;
          }
          break;
        default:
          break;
      }
    });

    return hasErrors;
  };

  const handleChange = e => {
    const type = e.target.name;
    const { value } = e.target;

    setInputErrors({ [type]: '' });
    setInputValues({ [type]: value });
  };

  const handleBlur = e => {
    const type = e.target.name;
    validateFields([type]);
  };

  const logIn = async e => {
    e.preventDefault();
    setServerError('');
    setIsLoading(true);

    if (validateFields(['email', 'password'])) return setIsLoading(false);

    try {
      await auth.signInWithEmailAndPassword(inputValues.email, inputValues.password);
      return history.push(routes.home);
    } catch (err) {
      setIsLoading(false);
      return handleServerErrors(err.code, err.message);
    }
  };

  const signUp = async e => {
    e.preventDefault();
    setServerError('');
    setIsLoading(true);

    const fields = Object.keys(inputValues);
    if (validateFields(fields)) return setIsLoading(false);

    try {
      await auth.createUserWithEmailAndPassword(inputValues.email, inputValues.password);
      await auth.currentUser.updateProfile({
        displayName: inputValues.name,
      });

      const defaultServices = {
        data: [
          {
            label: 'haircut',
            iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/2518/2518624.svg',
          },
          {
            label: 'hybrid nails',
            iconUrl: 'https://www.flaticon.com/svg/static/icons/svg/3635/3635413.svg',
          },
        ],
      };

      const defaultClients = {
        data: [
          {
            name: 'Jane Doe',
            email: 'jane@doe.com',
            phone: '123 456 789',
            image: null,
            clientID: uuid(),
          },
          {
            name: 'John Doe',
            email: 'john@doe.com',
            phone: '123 456 789',
            image:
              'https://images.pexels.com/photos/1998456/pexels-photo-1998456.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=200',
            clientID: uuid(),
          },
        ],
      };

      await db
        .collection(auth.currentUser.uid)
        .doc('services')
        .set(defaultServices);
      await db
        .collection(auth.currentUser.uid)
        .doc('clients')
        .set(defaultClients);
      await db
        .collection(auth.currentUser.uid)
        .doc('appointments')
        .set({ data: [] });
      await db
        .collection(auth.currentUser.uid)
        .doc('company')
        .set({
          id: uuid(),
          name: inputValues.company,
        });

      return history.push(routes.home);
    } catch (err) {
      setIsLoading(false);
      return handleServerErrors(err.code, err.message);
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
              {serverError && <StyledServerError>{serverError}</StyledServerError>}
              <InputField
                onBlur={handleBlur}
                error={inputErrors.email}
                autoComplete="current-email"
                onChange={handleChange}
                value={inputValues.email}
                type="email"
                placeholder="Your email"
                name="email"
              />
              <InputField
                onBlur={handleBlur}
                error={inputErrors.password}
                autoComplete="current-password"
                onChange={handleChange}
                value={inputValues.password}
                type="password"
                placeholder="Password"
                name="password"
              />
              <StyledButton>Submit</StyledButton>
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
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <Form onSubmit={signUp}>
              <FormTitle>Create new account</FormTitle>
              {serverError && <StyledServerError>{serverError}</StyledServerError>}
              <InputField
                onBlur={handleBlur}
                error={inputErrors.name}
                type="text"
                placeholder="Your name"
                name="name"
                value={inputValues.name}
                onChange={handleChange}
                autoComplete="name"
              />
              <InputField
                onBlur={handleBlur}
                error={inputErrors.company}
                type="text"
                placeholder="Company name"
                name="company"
                value={inputValues.company}
                onChange={handleChange}
                autoComplete="company"
              />
              <InputField
                onBlur={handleBlur}
                error={inputErrors.email}
                type="email"
                placeholder="Your email"
                name="email"
                value={inputValues.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <InputField
                onBlur={handleBlur}
                error={inputErrors.password}
                type="password"
                placeholder="Your password"
                name="password"
                value={inputValues.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <InputField
                onBlur={handleBlur}
                error={inputErrors.repeatPassword}
                type="password"
                placeholder="Repeat password"
                name="repeatPassword"
                value={inputValues.repeatPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <StyledButton>Submit</StyledButton>
              <ForgetMessage>
                Already have an account?{' '}
                <Link as={RouterLink} to={routes.login}>
                  Login
                </Link>
              </ForgetMessage>
            </Form>
          )}
        </>
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
