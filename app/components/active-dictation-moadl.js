import {
  Button,
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { shuffleArray } from '../lib/common-utils';
import EasySpeech from 'easy-speech';

export default function ActiveDictationModal({ words, isOpen, onOpenChange }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [shuffleWords, setShuffleWords] = useState([]);

  useEffect(() => {
    EasySpeech.init({ maxTimeout: 5000, interval: 250 })
      .then(() => console.debug('load complete'))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (!isOpen && wordIndex === words.length - 1) resetActiveDictation();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    playCurrentWord();
  }, [wordIndex, isOpen]);

  useEffect(() => {
    if (!words) return;
    setShuffleWords(shuffleArray(words));
  }, [words]);

  const handleNextWordClick = () => {
    setWordIndex((wordIndex) => wordIndex + 1);
  };

  const handleFinishClick = () => {
    onOpenChange(false);
  };

  const handleReplayClick = () => {
    playCurrentWord();
  };

  const resetActiveDictation = () => {
    setWordIndex(0);
    setShuffleWords(shuffleArray(words));
  };

  const renderActionButton = () => {
    const isLastWord = wordIndex === words.length - 1;

    if (isLastWord) {
      return (
        <Button
          className="flex-1"
          color="primary"
          variant="flat"
          onClick={handleFinishClick}>
          סיום הכתבה
        </Button>
      );
    } else {
      return (
        <Button
          className="flex-1"
          color="primary"
          variant="flat"
          onClick={handleNextWordClick}>
          מילה הבאה
        </Button>
      );
    }
  };

  const playCurrentWord = async () => {
    const word = shuffleWords[wordIndex].en;

    await EasySpeech.speak({
      text: word,
      pitch: 1,
      rate: 1,
      volume: 1,
      boundary: (e) => console.debug('boundary reached'),
    });
  };

  return (
    <Modal
      className="m-0 rounded-br-none rounded-bl-none"
      isOpen={isOpen}
      size="5xl"
      hideCloseButton={true}
      backdrop="blur"
      placement="bottom"
      onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody className="text-center">
          <p className="text-lg font-bold">כותרת להכתבה</p>
          <div className="flex justify-center">
            <div className="relative w-fit">
              <CircularProgress
                classNames={{
                  svg: 'w-40 h-40',
                }}
                value={(wordIndex + 1) * (100 / words.length)}
              />
              <div className="absolute top-[56px] right-[62px]">
                <p>מילה</p>
                <p>
                  {wordIndex + 1}/{words.length}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" onClick={handleReplayClick}>
              השמעה חוזרת
            </Button>
            {renderActionButton()}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
