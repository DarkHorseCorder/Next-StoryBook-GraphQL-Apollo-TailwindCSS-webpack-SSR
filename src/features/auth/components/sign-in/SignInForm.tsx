import { Button, TextField } from '@/components/';
import { makeElementClassNameFactory, makeRootClassName } from '@/utils';
import React, { ReactElement, useState } from 'react';
import { useSignIn } from '../../hooks';

// config

const ROOT = makeRootClassName('SignInForm');
const el = makeElementClassNameFactory(ROOT);

const DEFAULT_PROPS = {};

export type SignInFormProps = {
  handleSignIn: () => void;
  loading: boolean;
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  errorMessage?: string;
};

export const SignInForm = (props: SignInFormProps): ReactElement => {
  const {
    handleSignIn,
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

      <Button variant="primary" isDisabled={loading} onPress={handleSignIn}>
        Sign in
      </Button>
    </div>
  );
};

export default function SignInFormContainer(): ReactElement {
  const [signIn, { loading, error }] = useSignIn();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    await signIn({
      username: email,
      password,
    });
  };
  return (
    <SignInForm
      password={password}
      email={email}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSignIn={handleSignIn}
      loading={loading}
      errorMessage={error?.message}
    />
  );
}
