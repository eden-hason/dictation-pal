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

export default function WordsTable({
  className,
  words,
  onDeleteClick,
  onEditClick,
}) {
  const handlePlayClick = (text) => {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
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
