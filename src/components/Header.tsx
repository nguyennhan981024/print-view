import React from "react";
import { Button, Text } from "@chakra-ui/react";
import styles from "../styles/Header.module.scss";
import { AddIcon, ExternalLinkIcon } from "@chakra-ui/icons";
interface HeaderProps {
  setIsOpen: any;
}
const Header = ({ setIsOpen }: HeaderProps) => {
  return (
    <div className={styles["header-wrapper"]}>
      <Button colorScheme="teal" size="lg" onClick={() => setIsOpen(true)}>
        <AddIcon />
        <Text fontSize="md" marginLeft={2}>
          Import Document
        </Text>
      </Button>
      <Button colorScheme="teal" size="lg" onClick={() => window.print()}>
        <ExternalLinkIcon />
        <Text fontSize="md" marginLeft={2}>
          Export Document
        </Text>
      </Button>
    </div>
  );
};
export default Header;
