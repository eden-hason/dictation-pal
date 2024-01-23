import { Button } from '@nextui-org/button';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { BsPencil } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { RxSpeakerLoud } from 'react-icons/rx';
import EasySpeech from 'easy-speech';
import { useEffect } from 'react';

export default function WordsTable({
  className,
  words,
  onDeleteClick,
  onEditClick,
}) {
  useEffect(() => {
    EasySpeech.init({ maxTimeout: 5000, interval: 250 })
      .then(() => console.debug('load complete'))
      .catch((e) => console.error(e));
  }, []);

  const handlePlayClick = async (text) => {
    await EasySpeech.speak({
      text: text,
      pitch: 1,
      rate: 1,
      volume: 1,
      boundary: (e) => console.debug('boundary reached'),
    });
  };

  return (
    <Table
      className={className}
      hideHeader
      aria-label="Example static collection table">
      <TableHeader>
        <TableColumn></TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>
      <TableBody emptyContent={'אין מילים להצגה'}>
        {words.map((word) => (
          <TableRow key={word.id}>
            <TableCell>
              <div className="flex flex-col">
                <div className="text-sm">{word.en}</div>
                <div className="text-default-400 text-sm">{word.he}</div>
              </div>
            </TableCell>
            <TableCell className="">
              <div className="flex justify-end">
                <Button
                  isIconOnly
                  variant="light"
                  aria-label="Play"
                  onClick={() => handlePlayClick(word.en)}>
                  <RxSpeakerLoud />
                </Button>

                {onEditClick && (
                  <Button
                    isIconOnly
                    variant="light"
                    aria-label="Edit"
                    onClick={() => onEditClick(word.id)}>
                    <BsPencil />
                  </Button>
                )}

                {onDeleteClick && (
                  <Button
                    isIconOnly
                    className="text-danger"
                    variant="light"
                    aria-label="Delete"
                    onClick={() => onDeleteClick(word.id)}>
                    <BsTrash />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
