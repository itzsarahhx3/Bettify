import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";

import useAuth from "./hooks/useAuth";
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";

const spotifyApi = new SpotifyWebApi({
    clientId: "c45b9d152506477485a5f64fa7b244ce"
});
 
export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");

    // every time the track changes, empty the search & lyrics
    const chooseTrack = (track) => {
        setPlayingTrack(track);
        setSearch("");
        setLyrics("");
    };

    useEffect(() => {
        if (!playingTrack) return;

        axios
            .get("http://localhost:3001/lyrics", {
                params: {
                    track: playingTrack.title,
                    artist: playingTrack.artist
                }
            })
            .then((res) => {
                setLyrics(res.data.lyrics);
            });
    }, [playingTrack]);

    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        let cancel = false;
        // search track from spotify
        spotifyApi.searchTracks(search).then((res) => {
            // console.log(res.body.tracks.items);
            if (cancel) return;
            setSearchResults(
                // map over all the tracks
                res.body.tracks.items.map((track) => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image;
                            return smallest;
                        },
                        track.album.images[0]
                    );
                    // track info that we want to get
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        // get the smallest track image
                        albumUrl: smallestAlbumImage.url
                    };
                })
            );
        });

        // if a new request is sent, old request should be canceled
        return () => (cancel = true);
    }, [search, accessToken]);

    return (
        <Container
            className="d-flex flex-column py-2"
            style={{ height: "100vh" }}
        >
            <Form.Control
                type="search"
                placeholder="Search Songs/Artists"
                value={search}
                onChange={(evt) => setSearch(evt.target.value)}
            />
            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                {searchResults.map((track) => (
                    <TrackSearchResult
                        track={track}
                        key={track.uri}
                        chooseTrack={chooseTrack}
                    />
                ))}
                {searchResults.length === 0 && (
                    <div className="text-center" style={{ whiteSpace: "pre" }}>
                        {lyrics}
                    </div>
                )}
            </div>
            <div>
                <Player
                    accessToken={accessToken}
                    trackUri={playingTrack?.uri}
                />
            </div>
        </Container>
    );
}
