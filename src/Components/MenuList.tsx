import {
  Button,
  HStack,
  Heading,
  Image,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { menu } from "./data/menu";

const MenuList = () => {
  return (
    <>
      <List>
        {menu.map((item, index) => (
          <ListItem key={index} padding="10px">
            <HStack>
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight="bold"
                fontSize="lg"
                variant="link"
              >
                {item}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default MenuList;
