import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from '@nextui-org/react';
import { FaHourglassStart } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import moment from 'moment';
import { CiCalendarDate } from 'react-icons/ci';

export default function DictationCard({ dictation }) {
  return (
    <Card className="sm:w-full">
      <CardBody className="text-right">
        <p>{dictation.title}</p>
        <p className="text-sm mb-1">{`${dictation.words.length} מילים`}</p>
        <div className="text-default-400 text-xs flex items-center gap-1">
          <p className="text-sm">
            <CiCalendarDate />
          </p>
          {`${moment(dictation.createdAt.seconds * 1000).format('DD/MM/YYYY')}`}
        </div>
      </CardBody>
      <Divider />
      <CardFooter className="bg-purple-100 py-2">
        <ButtonGroup variant="light" className="w-full justify-between">
          <Button
            className="flex flex-col"
            as={Link}
            href={`dictation/${dictation.id}`}>
            <FaHourglassStart />
            <p className="text-xs">התחלה</p>
          </Button>
          <Button isDisabled className="flex flex-col">
            <BsPencil />
            <p className="text-xs">עריכה</p>
          </Button>
          <Button isDisabled className="flex flex-col">
            <BsTrash />
            <p className="text-xs">מחיקה</p>
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
