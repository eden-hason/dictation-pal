'use client';

import { NextUIProvider as _NextUIProvider } from '@nextui-org/react';

const NextUIProvider = ({ children }) => {
  return <_NextUIProvider>{children}</_NextUIProvider>;
};

export default NextUIProvider;
