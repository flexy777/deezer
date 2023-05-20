import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  VStack,
  Text,
  Heading,
  Box,
  SimpleGrid,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import ArtistDetails from "./ArtistDetails";

interface Track {
  id: number;
  title: string;
  duration: number;
  artist: {
    id: number;
    name: string;
    picture_medium: string;
  };
  album: {
    id: number;
    title: string;
    cover_medium: string;
  };
}

const Charts = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleTrackClick = (track: Track) => {
    setSelectedTrack(track);
  };

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch(
          "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/tracks"
        );
        const data = await response.json();
        setTracks(data.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching tracks:" + error);
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return (
    <VStack spacing="4">
      <Heading size="lg">Charts</Heading>
      {isLoading ? (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="4">
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              borderWidth="1px"
              borderRadius="md"
              padding="4"
              opacity="0.7"
              boxShadow="md"
              width="100%"
              boxSize="350px"
              margin="0 auto"
            ></Skeleton>
          ))}
        </SimpleGrid>
      ) : selectedTrack ? (
        <ArtistDetails artistId={selectedTrack.artist.id} />
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="4">
          {tracks.map((track) => (
            <Box
              key={track.id}
              borderWidth="1px"
              borderRadius="md"
              padding="4"
              onClick={() => handleTrackClick(track)}
              cursor="pointer"
              transition="all 0.3s"
              _hover={{ transform: "scale(1.05)" }}
              boxShadow="md"
              width="100%"
              maxW="400px"
              margin="0 auto"
            >
              <Box marginBottom="4">
                <Image
                  src={track.album.cover_medium}
                  alt={track.album.title}
                  borderRadius="md"
                  objectFit="cover"
                  height="200px"
                  width="100%"
                />
              </Box>
              <Text fontSize="lg" fontWeight="semibold" marginBottom="2">
                {track.title}
              </Text>
              <Text fontSize="md" color="gray.500" marginBottom="2">
                {track.artist.name}
              </Text>
              <Text fontSize="md" color="gray.500">
                {track.album.title}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default Charts;
