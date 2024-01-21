'use client';

import ActiveDictationModal from '@/app/components/active-dictation-moadl';
import WordsTable from '@/app/components/words-table';
import { db } from '@/app/lib/firebase/firebase';
import { Button, useDisclosure } from '@nextui-org/react';
import { doc, getDoc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DictationPage({}) {
  const [dictation, setDictation] = useState();
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchDictation = async () => {
      const id = pathname.split('/').pop();

      const docRef = doc(db, 'dictations', id);
      const docSnap = await getDoc(docRef);

      setDictation({ id: docSnap.id, ...docSnap.data() });
    };

    fetchDictation();
  }, []);

  if (!dictation) return null;

  return (
    <div className="p-4">
      <p className="text-xl font-bold mb-4">{dictation.title}</p>
      <WordsTable className={'mb-4'} words={dictation?.words} />
      <Button
        className="w-full"
        color="primary"
        variant="flat"
        onClick={onOpen}>
        התחלה
      </Button>

      <ActiveDictationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        words={dictation.words}
      />
    </div>
  );
}
