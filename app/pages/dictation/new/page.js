'use client';

import WordsTable from '@/app/components/words-table';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FaUndo } from 'react-icons/fa';

const WORD_INPUT_EMPTY_STATE = { id: '', en: '', he: '' };

export default function Page({}) {
  const [wordInput, setWordInput] = useState(WORD_INPUT_EMPTY_STATE);
  const [wordsInputs, setWordsInputs] = useState([]);

  const handleEnWordChange = (e) => {
    const { value } = e.target;
    setWordInput((wordInput) => ({ ...wordInput, en: value }));
  };

  const handleHeWordChange = (e) => {
    const { value } = e.target;
    setWordInput((wordInput) => ({ ...wordInput, he: value }));
  };

  const handleAddClick = () => {
    if (wordInput.id) {
      setWordsInputs((wordsInputs) =>
        wordsInputs.map((_wordInput) =>
          _wordInput.id === wordInput.id ? wordInput : _wordInput
        )
      );
    } else {
      setWordsInputs((words) => [
        ...words,
        { id: uuid(), en: wordInput.en, he: wordInput.he },
      ]);
    }

    setWordInput(WORD_INPUT_EMPTY_STATE);
  };

  const handleEditClick = (id) => {
    const relevantWordInput = wordsInputs.find(
      (wordInput) => wordInput.id === id
    );

    setWordInput(relevantWordInput);
  };

  const handleDeleteClick = (id) => {
    setWordsInputs((wordsInputs) =>
      wordsInputs.filter((wordInput) => wordInput.id !== id)
    );
  };

  const handleSaveClick = () => {
    console.log('save');
  };

  const renderFormTitle = () => {
    if (wordInput.id) {
      return (
        <div className="flex items-center">
          <p>עריכת מילה</p>

          <Button
            isIconOnly
            className="h-auto"
            variant="light"
            aria-label="Undo"
            onClick={() => setWordInput(WORD_INPUT_EMPTY_STATE)}>
            <FaUndo />
          </Button>
        </div>
      );
    }

    return <p>מילה חדשה</p>;
  };

  return (
    <div className="p-4">
      <p className="text-xl font-bold mb-4">הכתבה חדשה</p>

      <div className="mb-2">{renderFormTitle()}</div>
      <div className="flex w-full flex-wrap gap-4">
        <Input
          value={wordInput.en}
          size="sm"
          type="text"
          label="מילה באנגלית"
          onChange={handleEnWordChange}
        />
        <Input
          value={wordInput.he}
          size="sm"
          type="text"
          label="תרגום לעברית"
          onChange={handleHeWordChange}
        />
        <Button
          isDisabled={!wordInput.en && !wordInput.he}
          variant="flat"
          color="secondary"
          className="w-full"
          onClick={handleAddClick}>
          {wordInput.id ? 'עדכון מילה' : 'הוספת מילה'}
        </Button>
      </div>

      <Divider className="mb-4 mt-6" />

      <p className="mb-2">רשימת המילים</p>
      <WordsTable
        words={wordsInputs}
        className="mb-4"
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      {wordsInputs.length ? (
        <Button
          color="primary"
          variant="flat"
          className="w-full"
          onClick={handleSaveClick}>
          שמירת הכתבה
        </Button>
      ) : null}
    </div>
  );
}
