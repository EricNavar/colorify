import React from 'react';

import { Button, Link, styled } from '@mui/material';

import { SpotifyPlaylistProps } from '../commonTypes';
import { SpotifyLogin } from '../components/SpotifyLogin';
import { SpotifyPlaylist } from '../components/SpotifyPlaylist';
import { getPlaylists } from '../util/spotify-requests';

const ScrollableArea = styled('div')`
    height: calc(100vh - 250px);
    overflow: scroll;
    padding-right: 15px;
    display: flex;
    flex-wrap: wrap;
`;

const Header = styled(Link)`
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
    
    React.useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem('token') || '';
        
        const expirationTime = window.localStorage.getItem('token_expiration');
        const expirationTimeNumber = expirationTime ? +expirationTime : null;
        const expired = expirationTimeNumber && expirationTimeNumber <= new Date().getTime();

        // console.log('expirationTime:', expirationTimeNumber);
        // console.log('now:           ', new Date().getTime())

        // console.log('expirationTime:', expirationTimeNumber ? new Date(expirationTimeNumber).toLocaleString() : null)
        // console.log('now:           ', new Date().toLocaleString());

        if (!token && hash) {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')) || '';
            if (token) {
                token = token.split('=')[1];
                const newExpirationTime = +(new Date().getTime()) + 60 * 60; // token lasts an hour
                window.localStorage.setItem('token_expiration', newExpirationTime.toString());
            }
            window.location.hash = '';
            window.localStorage.setItem('token', token);
        }
        setToken(token);
        if (token && !expired) {
            setLoggedIn(true);
        } 

    }, []);

    React.useEffect(() => {
        fetchPlaylists();
    }, [token, page]);

    // const onChangeSearch = (event: any) => {
    //     event.preventDefault(); // is this necessary?
    //     setSearch(event.target.value);
    // };

    // const onSubmitSearch = async () => {
    //     setFilteredPlaylists(playlists.sort());
    // };

    const onClickPage = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div>
            <Header href='/' variant='h3'>Colorify</Header>
            <br/>
            <br/>
            {!loggedIn && <SpotifyLogin />}
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
                        {playlists.map((playlist, index) => <SpotifyPlaylist key={index} {...playlist}/>)}
                    </ScrollableArea>
                    {Array.from({length: totalPages}, (x, i) => i + 1).map((page: number, index: number) =>
                        <Button key={index} onClick={() => onClickPage(index)}>{index + 1}</Button>
                    )}
                </>
            }
        </div>

    );
};

export { Colorify };
