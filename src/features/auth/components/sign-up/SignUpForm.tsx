import React, { ReactElement, useState } from 'react';
import { Button, TextField } from '@/components/';
import { useSignUp } from '../../hooks';
import { makeElementClassNameFactory, makeRootClassName } from '@/utils';

// config

const ROOT = makeRootClassName('SignUpForm');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {};

export type SignUpFormProps = {
  handleSignup: () => void;
  loading: boolean;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  errorMessage?: string;
};

export const SignUpForm = (props: SignUpFormProps): ReactElement => {
  const {
    handleSignup,
    loading,
    email,
    password,
    setEmail,
    setPassword,
    errorMessage,
  } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  return (
    <div className={ROOT}>
      {errorMessage ? <div className={el`error`}>{errorMessage}</div> : <></>}
      <TextField
        name="email"
        value={email}
        onChange={setEmail}
        label="Email Address"
        type="text"
        placeholder="hello@example.com"
        isRequired
        isDisabled={loading}
      />
      <TextField
        name="password"
        value={password}
        onChange={setPassword}
        label="Password"
        type="password"
        isRequired
        isDisabled={loading}
      />

      <Button variant="primary" isDisabled={loading} onPress={handleSignup}>
        Sign up
      </Button>
    </div>
  );
};

export default function SignUpFormContainer(): ReactElement {
  const [signUp, { loading, error }] = useSignUp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    await signUp({
      email,
      password,
    });
  };
  return (
    <SignUpForm
      password={password}
      email={email}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSignup={handleSignup}
      loading={loading}
      errorMessage={error?.message}
    />
  );
}
