import React from 'react';

import styled from '@emotion/styled';
import { Color } from '@jgleman/color-box';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Link, Typography } from '@mui/material';
import { FastAverageColor } from 'fast-average-color';

import { SpotifySongProps } from '../commonTypes';
import { SpotifySongSquare } from '../components/SpotifySongSquare';
import { sortSongs } from '../util/sort-colors-songs-simple';
import { addSongsToPlaylist, createNewPlaylist, deletePlaylistSongs, getPlaylistDetails, getSongsFromPlaylist } from '../util/spotify-requests';

const SongContainer = styled('div')`
    display: flex;
    flex-wrap: wrap;
`;

const PlaylistArt = styled('img')`
    margin-right: 20px;
`;

const Details = styled('div')`
    display: flex;
    flex-wrap: wrap;
`;

type PlaylistPageProps = {
    playlistId: string;
};

const PlaylistPage = (props: PlaylistPageProps) => {
    const [songs, setSongs] = React.useState<SpotifySongProps[]>([]);
    const [token, setToken] = React.useState('');
    const [totalPages, setTotalPages] = React.useState<null | number>(null);
    const [thumbnail, setThumbnail] = React.useState('');
    const [name, setName] = React.useState('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [doneSorting, setDoneSorting] = React.useState(false);
    // some songs may be null and they are later filtered out, so we need pagesRequested and can't just use the length of the songs array
    const [pagesRequested, setPagesRequested] = React.useState<number>(0);
    const limit = 50;
    const [editable, setEditable] = React.useState<boolean>(false); // is the playlist editable by the user
    const [description, setDescription] = React.useState<string>('');
    const username = window.localStorage.getItem('username') || '';

    const fetchPlaylistDetails = async () => {
        let data;
        if (!token) {
            return;
        }
        else if (token) {
            data = await getPlaylistDetails(token, props.playlistId);
            if (data) {
                setThumbnail(data.thumbnail);
                setName(data.name);
                setDescription(data.description);
                const storedUsername = await username;
                setEditable(data.owner === storedUsername);
            }
        }
    };

    const fetchPlaylistSongs = async () => {
        let data;
        if (!token || (totalPages !== null && totalPages <= pagesRequested)) {
            return;
        }
        else if (token) {
            data = await getSongsFromPlaylist(token, props.playlistId, pagesRequested * limit);
            if (data) {
                if (!totalPages) {
                    setTotalPages(Math.ceil(data.totalSongs / 50));
                }
                setSongs([...songs, ...data.songs]);
                setPagesRequested((pagesRequested) => pagesRequested + 1);
            }
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        const storedToken = window.localStorage.getItem('token') || '';
        setToken(storedToken);
        fetchPlaylistDetails();
    });

    React.useEffect(() => {
        fetchPlaylistSongs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, pagesRequested]);

    const onClickColorify = async () => {
        setLoading(true);
        const fac = new FastAverageColor();
        const songsWithColors = await songs.map((song: SpotifySongProps) => {
            return fac.getColorAsync(song.thumbnail)
                .then(color => {
                    return {
                        ...song,
                        averageColor: new Color(color.hex)
                    };
                })
                .catch(e => {
                    console.log(e);
                    return song;
                });
        });
        Promise.all(songsWithColors).then(function (values) {
            const sortedSongs = sortSongs(values);
            setSongs(sortedSongs);
            setLoading(false);
            setDoneSorting(true);
        });
    };

    const onClickSaveToSamePlaylist = async () => {
        setLoading(true);

        //create array of array of songs with each subarray 100 long
        const songIds: string[][] = Array(Math.ceil(songs.length / 100)).fill([]);
        songs.forEach((song, index) => songIds[Math.floor(index / 100)].push(song.id));

        //delete songs from playlist
        await songIds.forEach((toDeleteChunk) => deletePlaylistSongs(token, props.playlistId, toDeleteChunk));

        //add songs in the right order
        songIds.forEach((toAddChunk) => addSongsToPlaylist(token, props.playlistId, toAddChunk));

        setLoading(false);
    };

    const onClickSaveToNewPlaylist = async () => {
        setLoading(true);

        //create array of array of songs with each subarray 100 long
        const songIds: string[][] = Array(Math.ceil(songs.length / 100)).fill([]);
        songs.forEach((song, index) => songIds[Math.floor(index / 100)].push(song.id));

        //create new playlist
        const newPlaylistId = await createNewPlaylist(token, username, `${name} - Colorified`, description);

        //add songs in the right order
        songIds.forEach((toAddChunk) => addSongsToPlaylist(token, newPlaylistId, toAddChunk));

        setLoading(false);
        window.open(`https://open.spotify.com/playlist/${newPlaylistId}`);
    };

    return (
        <div>
            <Details>
                <PlaylistArt src={thumbnail} height="180px" width="180px" />
                <div style={{alignContent: 'center', display:'grid'}}>
                    <Typography gutterBottom variant='h3'>{name}</Typography>
                    <Typography gutterBottom variant='body1'>{description}</Typography>
                    <Typography variant='body1'>{songs.length} songs</Typography>
                </div>
            </Details>
            <div style={{marginTop: 20, marginBottom: 20}}>
                {doneSorting ?
                    <>
                        <Button
                            variant='contained'
                            color='info'
                            disableElevation
                            onClick={onClickSaveToNewPlaylist}
                            style={{textTransform:'none'}}
                        >
                            Save to new playlist
                        </Button>
                        {editable && (
                            <Button
                                color='info'
                                style={{marginLeft:8, textTransform:'none'}}
                                variant='contained'
                                disableElevation
                                onClick={onClickSaveToSamePlaylist}
                            >
                                Save to same playlist
                            </Button>
                        )}
                    </> :
                    <LoadingButton
                        color='info'
                        variant='contained'
                        disableElevation
                        loading={loading}
                        onClick={onClickColorify}
                        style={{textTransform:'none'}}
                    >
                        Colorify
                    </LoadingButton>
                }
            </div>

            <SongContainer>
                {songs && songs.map((item, index) => item && <SpotifySongSquare key={index} {...item} />)}
            </SongContainer>
        </div>
    );
};

export { PlaylistPage };
