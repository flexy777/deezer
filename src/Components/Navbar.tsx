import React from "react";
import { HStack, Image, Box } from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import logo from "../assets/images/logo.png";
import SearchInput from "./SearchBar";
import ColorModeSwitch from "./ColorModeSwitch";

interface NavbarProps {
  onSearch: (searchTerm: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const handleSearch = (searchTerm: string) => {
    onSearch(searchTerm);
  };

  return (
    <HStack
      padding={{ base: "10px", md: "20px" }}
      spacing={3}
      align="center"
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Image src={logo} boxSize="60px" alt="Logo" />
      <Box flex="1">
        <SearchInput onSearch={handleSearch} />
      </Box>
      <Box>
        <ColorModeSwitch />
      </Box>
      <Box display={{ base: "none", md: "block" }}>
        <FiChevronDown size={24} />
      </Box>
    </HStack>
  );
};

export default Navbar;
