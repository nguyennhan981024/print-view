import React, { Fragment, useState } from "react";
import Header from "./Header";
import InputDocumentModal from "./InputDocumentModal";
import TableItem from "./TableItem";
import styles from "../styles/Home.module.scss";
import { Button } from "@chakra-ui/react";
import { DocumentType } from "../types";
interface HomePageProps {}
const HomePage = (props: HomePageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [documentGroup, setDocumentGroup] = useState<DocumentType[]>([]);
  const handleClose = () => {
    setIsOpen(!isOpen);
  };
  const prepareChunkList = (listDocument: string[]) => {
    const chunkSize = 20;
    const documentGroupList = [];
    for (let i = 0; i < listDocument.length; i += chunkSize) {
      const chunk = listDocument.slice(i, i + chunkSize);
      const tableItem = {
        id: Math.random() * 10,
        data: chunk,
      };
      documentGroupList.push(tableItem);
    }
    setDocumentGroup(documentGroupList);
    handleClose();
  };
  const handlePrepareDocument = (document: string) => {
    const listDocument = document
      .split("\n")
      .map((doc) => doc.replace(/([^\w]+)/, ": "));
    prepareChunkList(listDocument);
  };
  return (
    <div className={styles["home-page-wrapper"]}>
      <Header setIsOpen={setIsOpen} />
      <InputDocumentModal
        isOpen={isOpen}
        handleClose={handleClose}
        handlePrepareDocument={handlePrepareDocument}
      />
      <div className={styles["table-list-wrapper"]}>
        {documentGroup.map((doc) => (
          <Fragment key={doc.id}>
            <TableItem documentData={doc} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
export default HomePage;
