import React from 'react';

import { Button, styled, Typography } from '@mui/material';

import { SpotifyPlaylistProps } from '../commonTypes';
import { SpotifyLogin } from '../components/SpotifyLogin';
import { SpotifyPlaylistCard } from '../components/SpotifyPlaylistCard';
import { getPlaylists, getUsername } from '../util/spotify-requests';

const ScrollableArea = styled('div')`
    height: calc(100vh - 250px);
    overflow: scroll;
    padding-right: 15px;
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
`;

const Header = styled(Typography)`
    text-decoration: none;
`;

const Colorify = () => {
    const limit = 50; // playlists per request;
    // const [search, setSearch] = React.useState('');
    const [token, setToken] = React.useState('');

    const [playlists, setPlaylists] = React.useState<SpotifyPlaylistProps[]>([]);
    const [totalPlaylists, setTotalPlaylists] = React.useState<number>(0);
    const [page, setPage] = React.useState<number>(0);
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
    const totalPages = Math.ceil(totalPlaylists / limit);

    const fetchPlaylists = async () => {
        let data;
        if (token) {
            data = await getPlaylists(token, page);
            if (data) {
                setPlaylists(data.playlists);
                setTotalPlaylists(data.totalPlaylists);
            }
        }
    };

    const storeUsername = async () => {
        let username;
        if (token) {
            username = await getUsername(token);
            if (username) {
                window.localStorage.setItem('username', username);
            }
        }
    };
    
    React.useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('token') || '';
        
        const expirationTime = window.localStorage.getItem('token_expiration');
        const expirationTimeNumber = expirationTime ? +expirationTime : null;
        const expired = expirationTimeNumber && expirationTimeNumber <= new Date().getTime();

        // console.log('=========================');

        // console.log('expirationTime:', expirationTimeNumber);
        // console.log('now:           ', new Date().getTime())

        // console.log('expirationTime:', expirationTimeNumber ? new Date(expirationTimeNumber).toLocaleString() : null)
        // console.log('now:           ', new Date().toLocaleString());

        // console.log('expired:', expired);

        if (expired) {
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('token_expiration');
        }

        if (!token && hash) {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')) || '';
            if (token) {
                token = token.split('=')[1];
                // token lasts an hour. 1 hour is 60*60*1000 milliseconds
                const newExpirationTime = +(new Date().getTime()) + 60 * 60 * 1000;
                // console.log('NEW EXPIR TIME:', newExpirationTime);
                window.localStorage.setItem('token_expiration', newExpirationTime.toString());
            }
            window.location.hash = '';
            window.localStorage.setItem('token', token);
        }
        storeUsername();
        setToken(token);
        if (token && !expired) {
            setLoggedIn(true);
        }
    }, [storeUsername]);

    React.useEffect(() => {
        fetchPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, page]);

    // const onChangeSearch = (event: any) => {
    //     event.preventDefault(); // is this necessary?
    //     setSearch(event.target.value);
    // };

    // const onSubmitSearch = async () => {
    //     setFilteredPlaylists(playlists.sort());
    // };

    const onClickPage = (newPage: number) => {
        console.log('onClickPage')
        setPage(newPage);
    };

    return (
        <div>
            <Header variant='h3'>Colorify</Header>
            <br/>
            <br/>
            {!loggedIn && (
                <>
                    <Typography>Note: This project is currently in development mode but in the future I will ask Spotify to let me make it public. If you want to use it, I would need your email to put into the Spotify Dev console.</Typography>
                    <SpotifyLogin />
                </>
            )}
            {playlists.length > 0 &&
                <>
                    {/* <form>
                        <TextField
                            value={search}
                            onChange={onChangeSearch}
                            size='small'
                            placeholder='Search your playlists'
                        />
                        <Button onClick={onSubmitSearch}>Search</Button>
                    </form> */}
                    <ScrollableArea>
                        {playlists.map((playlist, index) => <SpotifyPlaylistCard key={index} {...playlist}/>)}
                    </ScrollableArea>
                    {Array.from({length: totalPages}, (x, i) => i + 1).map((pageNumber: number, index: number) => 
                        <Button
                            disableElevation
                            color='info'
                            key={index}
                            variant={index === page ? 'contained' : 'text'}
                            onClick={() => onClickPage(index)}
                        >
                            {index + 1}
                        </Button>
                    )}
                </>
            }
        </div>

    );
};

export { Colorify };
