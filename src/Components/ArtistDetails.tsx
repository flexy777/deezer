import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  VStack,
  Heading,
  Text,
  Flex,
  Box,
  HStack,
  Image,
  Grid,
  SimpleGrid,
} from "@chakra-ui/react";

interface ArtistDetailsProps {
  artistId: number;
}

interface Artist {
  id: number;
  name: string;
  nb_fan: number;
  picture_medium: string;
}

interface Track {
  id: number;
  title: string;
}

interface Album {
  id: number;
  title: string;
  release_date: string;
  cover_medium: string;
}

const ArtistDetails = ({ artistId }: ArtistDetailsProps) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        // Fetch artist details
        const artistResponse = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}`
        );
        const artistData = await artistResponse.json();
        setArtist(artistData);

        // Fetch top tracks
        const topTracksResponse = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}/top?limit=5`
        );
        const topTracksData = await topTracksResponse.json();
        setTopTracks(topTracksData.data);

        // Fetch albums
        const albumsResponse = await fetch(
          `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${artistId}/albums`
        );
        const albumsData = await albumsResponse.json();
        setAlbums(albumsData.data);
      } catch (error) {
        toast.error("Error fetching artist details:" + error);
      }
    };

    fetchArtistDetails();
  }, [artistId]);

  if (!artist) {
    return <Text>Loading artist details...</Text>;
  }

  return (
    <VStack spacing="8" align="center">
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="8">
        <Box>
          <Image
            src={artist.picture_medium}
            alt={artist.name}
            boxSize="400px"
            borderRadius="full"
            boxShadow="md"
          />
          <VStack spacing="4" ml="4">
            <Heading size="xl" textAlign="center" mt="5">
              {artist.name}
            </Heading>
            <Text fontSize="lg" color="gray.500">
              Total fans: {artist.nb_fan}
            </Text>
          </VStack>
        </Box>
        <Box>
          <Heading size="lg" mb="4">
            Top Tracks:
          </Heading>
          <SimpleGrid columns={1} spacing="8">
            {topTracks.map((track) => (
              <Box
                key={track.id}
                borderWidth="1px"
                borderRadius="md"
                padding="4"
                boxShadow="sm"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg",
                }}
              >
                <Text fontSize="lg" fontWeight="bold" mb="2">
                  {track.title}
                </Text>
                <Box
                  bgGradient="linear(to-r, purple.500, pink.500)"
                  h="4px"
                  borderRadius="md"
                />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Grid>

      <Box>
        <Heading size="lg" textAlign="center" mb="5" mt="5">
          Albums:
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 3 }} spacing="8">
          {albums.map((album) => (
            <Box
              key={album.id}
              // borderWidth="1px"
              borderRadius="md"
              padding="4"
              margin="4"
              boxShadow="lg"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-4px)",
                boxShadow: "lg",
              }}
            >
              <Image
                src={album.cover_medium}
                alt={album.title}
                boxSize="fit"
                objectFit="cover"
                borderRadius="md"
                mb="4"
                margin="auto"
              />
              <Text fontSize="lg" fontWeight="bold" textAlign="center">
                {album.title}
              </Text>
              <Text fontSize="sm" color="gray.500" mb="4" textAlign="center">
                Year: {album.release_date}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default ArtistDetails;
