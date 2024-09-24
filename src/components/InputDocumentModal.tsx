import React, {useState} from "react";
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
import {Checkbox, InputNumber} from "antd";
import {DocumentPayloadType} from "../types";

interface InputDocumentModalProps {
    isOpen: boolean;
    handleClose: () => void;
    handlePrepareDocument: (payload: DocumentPayloadType) => void;
}

const InputDocumentModal = ({
                                isOpen,
                                handleClose,
                                handlePrepareDocument,
                            }: InputDocumentModalProps) => {
    const [document, setDocument] = useState<string>("");
    const [isLoopOver, setIsLoopOver] = useState<boolean>(false)
    const [numberOfItem, setNumberOfItem] = useState<number | null>(14)
    const [isAutoImportNumber, setIsAutoImportNumber] = useState<boolean>(false)
    const handleChange = (event: any) => {
        setDocument(event.target.value.replace(/\n+/g, "\n"));
    };
    const handleChangeLoop = (event: any) => {
        setIsLoopOver(event.target.checked)
    }

    const changeNumberOfItem = (value: number | null) => {
        setNumberOfItem(value)
    }
    return (
        <Modal isOpen={isOpen} onClose={handleClose} closeOnEsc={true} size="2xl">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Input Document</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <div>
                        <div className="mb-1">
                            <Checkbox onChange={handleChangeLoop}>Loop over</Checkbox>
                            {isLoopOver &&
                                <InputNumber min={1} max={20} defaultValue={14} onChange={changeNumberOfItem}/>}
                        </div>
                        <div className="mb-1">
                            <Checkbox onChange={(event: any) => setIsAutoImportNumber(event.target.checked)}> Auto
                                import number</Checkbox>
                        </div>
                    </div>
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
                        onClick={() => handlePrepareDocument({
                            document: document,
                            isAutoImportNumber: isAutoImportNumber,
                            numberOfItems: numberOfItem,
                            isLoopOver: isLoopOver
                        })}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
export default InputDocumentModal;
