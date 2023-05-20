import { useEffect, useState } from "react";
import { VStack, Heading, Grid } from "@chakra-ui/react";
import TrackCard from "./TrackCard";
import { toast } from "react-toastify";

interface Track {
  id: number;
  artist: {
    id: number;
    name: string;
    picture_medium: string;
  };
  title: string;
  album: {
    title: string;
  };
  duration: number;
}

interface TrackProps {
  searchTerm: string;
  onArtistClick: (artistId: number) => void;
}

const Track = ({ searchTerm, onArtistClick }: TrackProps) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const API_URL = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=${searchTerm}`;
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch(API_URL);

        const data = await response.json();
        setTracks(data.data);
      } catch (error) {
        toast.error("Error searching tracks:" + error);
      }
    };

    if (searchTerm) {
      fetchTracks();
    } else {
      setTracks([]);
    }
  }, [searchTerm]);

  return (
    <VStack alignItems="stretch" spacing="4">
      <Heading size="lg">Results</Heading>
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap="4"
        alignItems="start"
      >
        {tracks.map((track) => (
          <TrackCard
            onClick={() => onArtistClick(track.artist.id)}
            key={track.id}
            artistName={track.artist.name}
            trackName={track.title}
            albumName={track.album.title}
            duration={track.duration}
            artistImage={track.artist.picture_medium}
          />
        ))}
      </Grid>
    </VStack>
  );
};

export default Track;
