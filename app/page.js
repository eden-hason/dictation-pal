'use client';

import { useContext } from 'react';
import { AuthContext } from './providers/AuthProvider';

export default function Home() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello world!</h1>
    </main>
  );
}
