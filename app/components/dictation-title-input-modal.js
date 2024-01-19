'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from '@nextui-org/react';
import { useState } from 'react';

export default function DictationTitleInputModal({
  isOpen,
  onOpenChange,
  onSubmit,
}) {
  const [title, setTitle] = useState('');

  const handleSubmitClick = (onClose) => {
    onClose();
    onSubmit(title);
  };

  return (
    <Modal
      isOpen={isOpen}
      hideCloseButton={true}
      backdrop="transparent"
      placement="bottom"
      onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <p className="text-lg font-bold">כותרת להכתבה</p>
              <Input
                value={title}
                size="xs"
                type="text"
                placeholder="שם שמתאר את ההכתבה (לא חובה)"
                onChange={(e) => setTitle(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                ביטול
              </Button>
              <Button
                color="primary"
                variant="flat"
                onPress={() => handleSubmitClick(onClose)}>
                שמירה
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
