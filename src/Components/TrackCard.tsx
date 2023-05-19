import { Box, Image, Text, Flex, VStack, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import ArtistDetails from "./ArtistDetails";

interface TrackCardProps {
  artistName: string;
  trackName: string;
  albumName?: string;
  duration: number;
  artistImage: string;
  onClick: () => void;
}

const TrackCard = ({
  artistName,
  trackName,
  albumName,
  duration,
  artistImage,
  onClick,
}: TrackCardProps) => {
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box
      p={4}
      borderRadius="md"
      boxShadow="md"
      cursor="pointer"
      onClick={onClick}
      position="relative"
    >
      {isLoading && (
        <Skeleton
          startColor="gray.200"
          endColor="gray.400"
          borderRadius="md"
          height="160px"
          width="100%"
          position="absolute"
          top={0}
          left={0}
          zIndex={1}
        />
      )}
      <Flex align="center" mb={2}>
        <Image
          src={artistImage}
          boxSize="40px"
          borderRadius="md"
          onLoad={handleImageLoad}
          opacity={isLoading ? 0 : 1}
          transition="opacity 0.3s"
        />
        <Text ml={2} fontWeight="bold">
          {artistName}
        </Text>
      </Flex>
      <VStack spacing={2} align="start">
        <Text fontWeight="bold">{trackName}</Text>
        <Text fontSize="sm" color="gray.500">
          {albumName}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Duration: {formatDuration(duration)}
        </Text>
      </VStack>
    </Box>
  );
};

export default TrackCard;
