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
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : undefined
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowHeight(window.innerHeight);
      window.addEventListener('resize', () =>
        setWindowHeight(window.innerHeight)
      );
    }

    return () =>
      window.removeEventListener('resize', () =>
        setWindowHeight(window.innerHeight)
      );
  }, []);

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
    <main
      style={{
        minHeight: `${windowHeight - 64}px`,
        height: `${windowHeight - 64}px`,
      }}>
      <div className="flex flex-col items-center justify-between p-4 h-full">
        <div className="w-full md:max-w-md">
          <p className="text-xl font-bold mb-4">ההכתבות שלי</p>
          <div className="flex flex-col space-y-4">
            {dictations.map((dictation) => (
              <DictationCard key={dictation.id} dictation={dictation} />
            ))}
          </div>
        </div>
        <div className="w-full md:max-w-md">
          <Button
            as={Link}
            href="dictation/new"
            color="primary"
            variant="light"
            startContent={<FaPlus />}>
            הכתבה חדשה
          </Button>
        </div>
      </div>
    </main>
  );
}
