import React from "react";
import { ListItem, OrderedList } from "@chakra-ui/react";
import styles from "../styles/Home.module.scss";
import { DocumentType } from "../types";
import { Fragment } from "react";
interface TableItemProps {
  documentData: DocumentType;
}
const TableItem = ({ documentData }: TableItemProps) => {
  return (
    <div className={styles["table-item-wrapper"]}>
      <OrderedList>
        {documentData?.data?.map((data, index) => (
          <Fragment key={index}>
            <ListItem>{data}</ListItem>
          </Fragment>
        ))}
      </OrderedList>
    </div>
  );
};
export default TableItem;
