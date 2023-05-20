import { Input, InputGroup, InputLeftElement, Button } from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onSearch: (searchTerm: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };
  return (
    <form>
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          value={searchTerm}
          borderRadius={20}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tracks..."
          variant="filled"
        />
        <Button
          ms="2"
          borderRadius={10}
          onClick={handleSearch}
          colorScheme="teal"
        >
          Search
        </Button>
      </InputGroup>
    </form>
  );
};

export default SearchInput;
