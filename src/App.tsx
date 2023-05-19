import { useState } from "react";
import "./App.css";
import { Box, Flex, Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import Navbar from "./Components/Navbar";
import Track from "./Components/Track";

import Charts from "./Components/Charts";
import ArtistDetails from "./Components/ArtistDetails";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setSelectedArtistId(null);
  };
  const handleArtistClick = (artistId: number) => {
    setSelectedArtistId(artistId);
  };
  return (
    <Grid
      templateAreas={{
        base: `"nav" " main" `,
        lg: `"nav" "main" `,
      }}
      templateColumns={{
        base: "1fr",
        lg: "1fr",
      }}
      height="100vh"
    >
      <GridItem area="nav">
        <Navbar onSearch={handleSearch} />
      </GridItem>

      <GridItem area="main">
        <Box padding="4">
          {selectedArtistId ? (
            <ArtistDetails artistId={selectedArtistId} />
          ) : searchTerm ? (
            <Track searchTerm={searchTerm} onArtistClick={handleArtistClick} />
          ) : (
            <Charts />
          )}
        </Box>
      </GridItem>
    </Grid>
  );
}

export default App;
