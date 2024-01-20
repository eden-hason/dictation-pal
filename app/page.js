'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './providers/AuthProvider';
import { FaPlus } from 'react-icons/fa';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/react';
import DictationCard from './components/dictation-card';
import { db } from '@/app/lib/firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDocsData } from './lib/common-utils';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [dictations, setDictations] = useState([]);

  useEffect(() => {
    const fetchDictations = async () => {
      const q = query(
        collection(db, 'dictations'),
        where('userId', '==', user.uid)
      );

      const querySnapshot = await getDocs(q);
      const data = getDocsData(querySnapshot);

      setDictations(data);
    };

    if (!user) return;

    fetchDictations();
  }, [user]);

  if (!user) return null;

  return (
    <main className="flex flex-col items-center justify-between min-h-[inherit] p-4">
      <div className="w-full md:max-w-md">
        <p className="text-xl font-bold mb-4">ההכתבות שלי</p>
        {dictations.map((dictation) => (
          <DictationCard key={dictation.id} dictation={dictation} />
        ))}
      </div>
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
