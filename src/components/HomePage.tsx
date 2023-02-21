import React, { Fragment, useState } from "react";
import Header from "./Header";
import InputDocumentModal from "./InputDocumentModal";
import TableItem from "./TableItem";
import styles from "../styles/Home.module.scss";
import { DocumentType } from "../types";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Alert, AlertIcon } from "@chakra-ui/react";
const ResponsiveGridLayout = WidthProvider(Responsive);
const HomePage = () => {
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
    const oddArray: DocumentType[] = [];
    const eventArray: DocumentType[] = [];
    documentGroupList.forEach((item, index) => {
      if (index % 2 === 0) {
        oddArray.push(item);
      } else {
        eventArray.push(item);
      }
    });
    const copyEvent = [...eventArray.reverse()];
    for (let i = 0; i < copyEvent.length; i += 3) {
      const chunk = copyEvent.splice(i, 3);
      copyEvent.push(...chunk);
    }
    setDocumentGroup(oddArray.concat(copyEvent));
    handleClose();
  };

  const handlePrepareDocument = (document: string) => {
    const listDocument = document
      .split("\n")
      .map((doc) => doc.replace(/([^\w]+)/, " : "));
    prepareChunkList(listDocument);
  };
  const [layout, setLayout] = useState<any>([]);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  const handleDrop = (layout: any, oldIndex: any, newIndex: any) => {
    const updatedLayout = [...layout];
    const movedElement = updatedLayout.splice(oldIndex, 1)[0];
    updatedLayout.splice(newIndex, 0, movedElement);
    setLayout(updatedLayout);
  };

  const getItemLayout = (index: any) => {
    const x = index % 4;
    const y = Math.floor(index / 4) * 3;
    return { x, y, w: 1, h: 3 };
  };
  console.log("layout", layout);
  return (
    <div className={styles["home-page-wrapper"]}>
      <Header setIsOpen={setIsOpen} />
      <InputDocumentModal
        isOpen={isOpen}
        handleClose={handleClose}
        handlePrepareDocument={handlePrepareDocument}
      />
      {documentGroup && documentGroup?.length > 0 ? (
        <Fragment>
          <Alert status="success">
            <AlertIcon />
            Having fun drag and drop by holding mouse on element and move
            between them to matching with your expectation then click export
            document button to print 😜😎
          </Alert>
          <ResponsiveGridLayout
            className={`${styles["table-list-wrapper"]} ${styles["layout"]}`}
            layouts={{ lg: layout }}
            onLayoutChange={onLayoutChange}
            isDraggable={true}
            isResizable={false}
            cols={{ lg: 6, md: 3, sm: 3 }}
            autoSize={true}
            rowHeight={100}
            verticalCompact={false}
            onDrop={handleDrop}
          >
            {documentGroup &&
              documentGroup.map((doc, index) => (
                <div key={doc.id} data-grid={getItemLayout(index)}>
                  <TableItem documentData={doc} />
                </div>
              ))}
          </ResponsiveGridLayout>
        </Fragment>
      ) : (
        <div className={styles["no-document-text"]}>
          <Alert status="error">
            <AlertIcon />
            There was nothing to exported 😢 please import 🤓 your documents or
            get the previous lists from history 🤤 ( history feature will
            deliver soon in the future because it is under development i swear
            😭)
          </Alert>
        </div>
      )}
    </div>
  );
};
export default HomePage;
