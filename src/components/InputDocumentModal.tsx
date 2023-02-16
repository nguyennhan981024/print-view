import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";

interface InputDocumentModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handlePrepareDocument: (document: string) => void;
}

const InputDocumentModal = ({
  isOpen,
  handleClose,
  handlePrepareDocument,
}: InputDocumentModalProps) => {
  const [document, setDocument] = useState<string>("");
  const handleChange = (event: any) => {
    setDocument(event.target.value.replace(/\n+/g, "\n"));
  };
  return (
    <Modal isOpen={isOpen} onClose={handleClose} closeOnEsc={true} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Input Document</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            autoFocus={true}
            height={300}
            size="lg"
            placeholder="Place your document here ..."
            onChange={handleChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => handlePrepareDocument(document)}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default InputDocumentModal;
