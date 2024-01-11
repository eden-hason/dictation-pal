'use client';

import { useContext } from 'react';
import { AuthContext } from './providers/AuthProvider';
import { Button } from '@nextui-org/button';
import { FaPlus } from 'react-icons/fa';
import { Link } from '@nextui-org/link';

export default function Home() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <main className="flex flex-col items-center justify-between p-4">
      <h1>Hello world!</h1>
      <div className="w-full">
        <Button
          as={Link}
          href="pages/dictation/new"
          color="primary"
          variant="light"
          startContent={<FaPlus />}>
          הכתבה חדשה
        </Button>
      </div>
    </main>
  );
}
