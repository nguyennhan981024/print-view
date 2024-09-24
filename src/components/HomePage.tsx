import React, { Fragment, useState } from "react";
import Header from "./Header";
import InputDocumentModal from "./InputDocumentModal";
import TableItem from "./TableItem";
import styles from "../styles/Home.module.scss";
import {DocumentPayloadType, DocumentType} from "../types";
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

  const handlePrepareDocument = (payload: DocumentPayloadType) => {
    let listDocumentInitial:string[] = payload.document
      .split("\n")
    // reset listdocument initial case timetable
    if(listDocumentInitial?.length < 20 && payload?.isLoopOver && payload?.numberOfItems) {
      for(let i = listDocumentInitial?.length; i < 20; i++) {
        listDocumentInitial.push('')
      }
    }
    let listDocument:string[] = [...listDocumentInitial]
    // Check case iterate over number of item
    if(payload?.isLoopOver && payload?.numberOfItems) {
      for(let i = 1; i <= payload?.numberOfItems; i++) {
       listDocument = listDocument.concat(listDocumentInitial)
      }
    }
    // check case have no number
    if(!payload?.isAutoImportNumber) {
      listDocument = listDocument.map((doc) => doc.replace(/([^\w]+)/, ": "));
    } else {
      let index = 0
      listDocument = listDocument.map((doc: string) => {
        index += 1;
        if(index > 20) index = 1
        return `${index}: ` + doc
      });
    }
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
          <div className={styles["no-document-text"]}>
            <Alert status="success">
              <AlertIcon />
              Having fun drag and drop by holding mouse on element and move
              between them to matching with your expectation then click export
              document button to print 😜😎
            </Alert>
          </div>
          {/*<ResponsiveGridLayout*/}
          {/*  className={`${styles["table-list-wrapper"]} ${styles["layout"]}`}*/}
          {/*  layouts={{ lg: layout }}*/}
          {/*  onLayoutChange={onLayoutChange}*/}
          {/*  isDraggable={true}*/}
          {/*  isResizable={false}*/}
          {/*  breakpoints={{ lg: 3, md: 6, sm: 3 }}*/}
          {/*  autoSize={true}*/}
          {/*  rowHeight={100}*/}
          {/*  verticalCompact={false}*/}
          {/*  onDrop={handleDrop}*/}
          {/*>*/}
          <div className={`${styles["table-list-wrapper"]} ${styles["layout"]}`}>
            {documentGroup &&
                documentGroup.map((doc, index) => (
                    <div key={doc.id} data-grid={getItemLayout(index)}>
                      <TableItem documentData={doc} />
                    </div>
                ))}
          </div>
          {/*</ResponsiveGridLayout>*/}
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
