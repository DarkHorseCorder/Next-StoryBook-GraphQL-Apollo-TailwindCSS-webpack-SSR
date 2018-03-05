import React, { ReactElement } from 'react';
import { makeRootClassName } from '../utils';

const ROOT = makeRootClassName('NotFound');

export default function NotFound(): ReactElement {
  return <div className={ROOT}>Not Found</div>;
}
